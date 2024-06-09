import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Tree } from 'src/domains/skills/woodcutting/types/tree.type';
import { GetCategoryMembersApiResponse } from './types/get-category-members-api-response.type';
import { firstValueFrom } from 'rxjs';
import { GetPagesApiResponse } from './types/get-pages-api-response.type';
import { TREES_TO_FETCH } from './const/trees-to-fetch';

@Injectable()
export class OsrsWikiApiService {
  #apiUrl = 'https://oldschool.runescape.wiki/api.php';

  constructor(private readonly httpService: HttpService) {}

  async fetchTrees(): Promise<Tree[]> {
    const fetchedTreesDetails = await this.#fetchDetailsFromIds(TREES_TO_FETCH);

    return TREES_TO_FETCH.map((treeId): Tree => {
      const pageInfos = fetchedTreesDetails.find(
        (page) => treeId === page.pageid,
      );
      const treeInfo = this.#extractContent(
        pageInfos.revisions[0].slots.main.content,
      );
      return {
        id: treeId,
        name: treeInfo.name,
        image: treeInfo.image,
        reward: {
          items: [],
          experience: treeInfo.experience,
        },
      };
    });
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

  #extractContent(content: string): {
    experience?: number;
    image: string;
    name: string;
  } {
    const imagePattern = /image1? = \[\[File:\s*([^|]+)/;

    const imageMatch = imagePattern.exec(content);

    return {
      name: this.#getKeyFromContent('name', content),
      experience: parseInt(this.#getKeyFromContent('xp', content), 10),
      image:
        'https://oldschool.runescape.wiki/images/' +
        imageMatch[1].replace(/\s/g, '_'),
    };
  }

  #getKeyFromContent(keyRegex: string, content: string): string | null {
    const pattern = new RegExp(String.raw`${keyRegex} =\s*(.+)\n`);
    const patternMatch = pattern.exec(content);

    if (patternMatch) return patternMatch[1];
    else return null;
  }
}
