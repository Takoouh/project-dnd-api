import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { OsrsWikiApiService } from 'src/domains/_external/osrs-wiki-api/osrs-wiki-api.service';
import * as request from 'supertest';
import { WoodcuttingModule } from '../../../woodcutting.module';
import { TreeMockBuilder } from '../../mock/tree.mock-builder';
import { ItemMockBuilder } from 'src/domains/items/__test__/mock/item.mock-builder';

describe('E2E - Get Trees', () => {
  let app: INestApplication;
  let osrsWikiApiService: OsrsWikiApiService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [WoodcuttingModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    osrsWikiApiService = module.get(OsrsWikiApiService);

    await module.close();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should fetch trees', async () => {
    //WHEN
    const tree1 = new TreeMockBuilder('Tree')
      .withId(1)
      .withReward({ experience: 10 });
    const item1 = new ItemMockBuilder('item1');
    const tree2 = new TreeMockBuilder('Tree 2')
      .withId(2)
      .withReward({ experience: 20, items: [item1] });
    jest
      .spyOn(osrsWikiApiService, 'fetchTrees')
      .mockResolvedValue([tree1, tree2]);

    //THEN
    const response = await request(app.getHttpServer()).get(
      '/skills/woodcutting/trees',
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      trees: [tree1, tree2],
    });
  });
});
