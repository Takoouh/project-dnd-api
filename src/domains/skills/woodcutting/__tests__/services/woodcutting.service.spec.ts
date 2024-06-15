import { Test } from '@nestjs/testing';
import { WoodcuttingService } from '../../woodcutting.service';
import { createMock } from '@golevelup/ts-jest';
import { OsrsWikiApiService } from 'src/domains/_external/osrs-wiki-api/osrs-wiki-api.service';

describe('WoodcuttingService', () => {
  let woodcuttingService: WoodcuttingService;

  let osrsApiProviderSpy: OsrsWikiApiService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [WoodcuttingService],
    })
      .useMocker((token) => createMock(token))
      .compile();

    woodcuttingService = module.get(WoodcuttingService);
    osrsApiProviderSpy = module.get(OsrsWikiApiService);
  });

  describe('fetchTrees', () => {
    it('should properly call provider', () => {
      //THEN
      woodcuttingService.fetchTrees();
      expect(osrsApiProviderSpy.fetchTrees).toHaveBeenCalled();
    });
  });
});
