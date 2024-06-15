import { Injectable } from '@nestjs/common';
import { GetPagesApiResponse } from '../types/get-pages-api-response.type';
import { Item } from 'src/domains/_types/item.type';
import { Farmable } from 'src/domains/_types/farmable.type';
import { OsrsFetchedResource } from '../types/osrs-fetched-ressource.type';

@Injectable()
export class OsrsContentSerializers {
  public toFarmable(
    fetchedResource: OsrsFetchedResource,
    fetchedItems: GetPagesApiResponse['query'],
  ): Farmable {
    return {
      id: fetchedResource.id,
      name: this.getKeyFromContent('name', fetchedResource.content),
      experience: parseInt(
        this.getKeyFromContent('xp', fetchedResource.content),
      ),
      requiredLevel: parseInt(
        this.getKeyFromContent('level', fetchedResource.content),
      ),
      respawnTime: parseInt(
        this.getKeyFromContent('time', fetchedResource.content),
      ),
      image: this.getImageFromContent(fetchedResource.content),
      reward: {
        experience: parseInt(
          this.getKeyFromContent('xp', fetchedResource.content),
        ),
        items: fetchedResource.rewardItemsTitles.map((itemTitle) =>
          this.toItem(itemTitle, fetchedItems),
        ),
      },
    };
  }

  public toItem(
    itemTitle: string,
    fetchedItemsContent: GetPagesApiResponse['query'],
  ): Item {
    //We need to retrieve the normalized key if exists
    //some items has typo in title
    const matchingItemKey = (fetchedItemsContent.normalized || []).find(
      ({ from }) => from === itemTitle,
    );
    const matchingItem = fetchedItemsContent.pages.find(
      ({ title }) => title === (matchingItemKey?.to || itemTitle),
    );
    const itemContent = matchingItem.revisions[0].slots.main.content;

    return {
      name: this.getKeyFromContent('name', itemContent),
      image: this.getImageFromContent(itemContent),
    };
  }

  public getImageFromContent(content: string): string {
    const imagePattern = /image1?\s=\s\s?\[\[File:\s*([^|]+.png)/;

    const imageMatch = imagePattern.exec(content);

    return (
      'https://oldschool.runescape.wiki/images/' +
      imageMatch[1].replace(/\s/g, '_')
    );
  }

  public getRewardItemsIdFromContent(content: string): string[] {
    const itemLinePattern =
      /(?:{{DropsLineSkill\|name=(.*)\|quantity=(\d)\|rarity=(.*)\|skill=(.*).*}})/gm;
    const itemLinesMatches = [...content.matchAll(itemLinePattern)];
    return itemLinesMatches.map((regMatch) => regMatch[1]);
  }

  public getKeyFromContent(keyRegex: string, content: string): string | null {
    const pattern = new RegExp(String.raw`${keyRegex}\s\s?=\s\s*(.+)\n`);
    const patternMatch = pattern.exec(content);

    if (patternMatch) return patternMatch[1];
    else return null;
  }
}
