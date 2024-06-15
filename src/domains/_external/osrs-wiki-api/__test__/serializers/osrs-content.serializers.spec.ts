import { createMock } from '@golevelup/ts-jest';
import { OsrsContentSerializers } from '../../serializers/osrs-content.serializers';
import { GetPagesApiResponse } from '../../types/get-pages-api-response.type';
import { OsrsFetchedResource } from '../../types/osrs-fetched-ressource.type';

describe('OsrsContentSerializers', () => {
  const osrsContentSerializers = new OsrsContentSerializers();

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('toFarmable', () => {
    it('should format resources', () => {
      //GIVEN
      const fetchedResource: OsrsFetchedResource = {
        id: 1,
        content: 'content',
        rewardItemsTitles: ['item1'],
      };

      const fetchedItems: GetPagesApiResponse['query'] = createMock();

      //WHEN
      jest
        .spyOn(osrsContentSerializers, 'getKeyFromContent')
        .mockReturnValue('5');
      jest
        .spyOn(osrsContentSerializers, 'getImageFromContent')
        .mockReturnValue('image/url');
      jest
        .spyOn(osrsContentSerializers, 'toItem')
        .mockReturnValue({ name: 'name', image: 'item/image' });

      //THEN
      expect(
        osrsContentSerializers.toFarmable(fetchedResource, fetchedItems),
      ).toEqual({
        id: 1,
        name: '5',
        image: 'image/url',
        experience: 5,
        respawnTime: 5,
        requiredLevel: 5,
        reward: {
          experience: 5,
          items: [{ name: 'name', image: 'item/image' }],
        },
      });
      expect(osrsContentSerializers.toItem).toHaveBeenCalledWith(
        'item1',
        fetchedItems,
      );

      expect(osrsContentSerializers.getKeyFromContent).toHaveBeenCalledWith(
        'name',
        fetchedResource.content,
      );
      expect(osrsContentSerializers.getKeyFromContent).toHaveBeenCalledWith(
        'xp',
        fetchedResource.content,
      );
      expect(osrsContentSerializers.getKeyFromContent).toHaveBeenCalledWith(
        'level',
        fetchedResource.content,
      );
      expect(osrsContentSerializers.getKeyFromContent).toHaveBeenCalledWith(
        'time',
        fetchedResource.content,
      );
      expect(osrsContentSerializers.getImageFromContent).toHaveBeenCalledWith(
        fetchedResource.content,
      );
    });
  });

  describe('toItem', () => {
    it('should format item with matching title when there is no normalized content', () => {
      //GIVEN
      const itemTitle = 'title item';
      const itemContent = 'content';
      const fetchedItemsContent: GetPagesApiResponse['query'] = {
        pages: [
          {
            ns: 1,
            pageid: 123,
            title: itemTitle,
            revisions: [{ slots: { main: { content: itemContent } } }],
          },
        ],
      };

      //WHEN
      jest
        .spyOn(osrsContentSerializers, 'getImageFromContent')
        .mockReturnValue('item/url');
      jest
        .spyOn(osrsContentSerializers, 'getKeyFromContent')
        .mockReturnValue('key');

      //THEN
      expect(
        osrsContentSerializers.toItem(itemTitle, fetchedItemsContent),
      ).toEqual({
        name: 'key',
        image: 'item/url',
      });
      expect(osrsContentSerializers.getKeyFromContent).toHaveBeenCalledWith(
        'name',
        itemContent,
      );
      expect(osrsContentSerializers.getImageFromContent).toHaveBeenCalledWith(
        itemContent,
      );
    });
    it('should format item with normalized title when there is normalization', () => {
      //GIVEN
      const itemTitle = 'title item';
      const itemContent = 'content';
      const fetchedItemsContent: GetPagesApiResponse['query'] = {
        normalized: [
          {
            fromencoded: false,
            from: itemTitle,
            to: 'new title',
          },
        ],
        pages: [
          {
            ns: 1,
            pageid: 123,
            title: 'new title',
            revisions: [{ slots: { main: { content: itemContent } } }],
          },
        ],
      };

      //WHEN
      jest
        .spyOn(osrsContentSerializers, 'getImageFromContent')
        .mockReturnValue('item/url');
      jest
        .spyOn(osrsContentSerializers, 'getKeyFromContent')
        .mockReturnValue('key');

      //THEN
      expect(
        osrsContentSerializers.toItem(itemTitle, fetchedItemsContent),
      ).toEqual({
        name: 'key',
        image: 'item/url',
      });
      expect(osrsContentSerializers.getKeyFromContent).toHaveBeenCalledWith(
        'name',
        itemContent,
      );
      expect(osrsContentSerializers.getImageFromContent).toHaveBeenCalledWith(
        itemContent,
      );
    });
  });

  describe('getImageFromContent', () => {
    it('should return image url when content match regex with "image1" and 2 space after the =', () => {
      //GIVEN
      const content = 'erzeimage1 =  [[File: test.png]]';

      //THEN
      expect(osrsContentSerializers.getImageFromContent(content)).toEqual(
        'https://oldschool.runescape.wiki/images/test.png',
      );
    });

    it('should return image url with space replace by underscore when content match regex with "image" and has space in it', () => {
      //GIVEN
      const content = 'erzeimage = [[File: test with space.png]]';

      //THEN
      expect(osrsContentSerializers.getImageFromContent(content)).toEqual(
        'https://oldschool.runescape.wiki/images/test_with_space.png',
      );
    });
  });

  describe('getRewardItemsIdFromContent', () => {
    it('should returns items id from content', () => {
      //GIVEN
      const content =
        '{{DropsLineSkill|name=Logs|quantity=1|rarity=Always|skill=Woodcutting}}\n{{DropsLineSkill|name=Logs 2|quantity=1|rarity=Always|skill=Woodcutting}}';

      //THEN
      expect(
        osrsContentSerializers.getRewardItemsIdFromContent(content),
      ).toEqual(['Logs', 'Logs 2']);
    });
  });

  describe('getKeyFromContent', () => {
    it('should return value from content when pattern match key', () => {
      //GIVEN
      const content = 'nopy\n|name = Tree\n|imag';
      const key = 'name';

      //THEN
      expect(osrsContentSerializers.getKeyFromContent(key, content)).toEqual(
        'Tree',
      );
    });

    it('should return null from content when pattern does not match key', () => {
      //GIVEN
      const content = 'nopy\n|name = Tree\n|imag';
      const key = 'experience';

      //THEN
      expect(osrsContentSerializers.getKeyFromContent(key, content)).toEqual(
        null,
      );
    });
  });
});
