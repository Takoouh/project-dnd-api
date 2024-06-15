import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Tree } from 'src/domains/skills/woodcutting/types/tree.type';
import { TREES_TO_FETCH } from './const/trees-to-fetch';
import { OsrsContentSerializers } from './serializers/osrs-content.serializers';
import { GetPagesApiResponse } from './types/get-pages-api-response.type';
import { OsrsFetchedResource } from './types/osrs-fetched-ressource.type';

@Injectable()
export class OsrsWikiApiService {
  #apiUrl = 'https://oldschool.runescape.wiki/api.php';

  constructor(
    private readonly httpService: HttpService,
    private readonly osrsContentSerializers: OsrsContentSerializers,
  ) {}

  async fetchTrees(): Promise<Tree[]> {
    const fetchedTreesDetails = await this.#fetchDetailsFromIds(TREES_TO_FETCH);

    const treesWithoutFetchedRewardItems = TREES_TO_FETCH.map(
      (treeId): OsrsFetchedResource => {
        const pageInfos = fetchedTreesDetails.find(
          (page) => treeId === page.pageid,
        );
        const treeContent = pageInfos.revisions[0].slots.main.content;

        return {
          id: treeId,
          content: treeContent,
          rewardItemsTitles:
            this.osrsContentSerializers.getRewardItemsIdFromContent(
              treeContent,
            ),
        };
      },
    );

    const itemsIdsToFetch = [
      ...new Set(
        treesWithoutFetchedRewardItems.flatMap(
          (tree) => tree.rewardItemsTitles,
        ),
      ),
    ];

    const fetchedRewardItems =
      await this.#fetchDetailsFromTitles(itemsIdsToFetch);
    return treesWithoutFetchedRewardItems.map((tree) =>
      this.osrsContentSerializers.toFarmable(tree, fetchedRewardItems),
    );
  }

  async #fetchDetailsFromIds(
    pageIds: number[],
  ): Promise<GetPagesApiResponse['query']['pages']> {
    const detailParams = {
      action: 'query',
      prop: 'revisions',
      rvprop: 'content',
      pageids: pageIds.join('|'),
      rvslots: 'main',
      format: 'json',
      formatversion: 'latest',
    };

    const { data } = await firstValueFrom(
      this.httpService.get<GetPagesApiResponse>(`${this.#apiUrl}`, {
        params: detailParams,
      }),
    );

    return data.query.pages;
  }

  async #fetchDetailsFromTitles(
    pageIds: string[],
  ): Promise<GetPagesApiResponse['query']> {
    const detailParams = {
      action: 'query',
      prop: 'revisions',
      iwurl: 1,
      rvprop: 'content',
      titles: pageIds.join('|'),
      rvslots: 'main',
      format: 'json',
      formatversion: 'latest',
    };

    const { data } = await firstValueFrom(
      this.httpService.get<GetPagesApiResponse>(`${this.#apiUrl}`, {
        params: detailParams,
      }),
    );

    return data.query;
  }
}
