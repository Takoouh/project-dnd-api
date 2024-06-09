import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { OsrsWikiApiService } from 'src/domains/_external/osrs-wiki-api/osrs-wiki-api.service';
import * as request from 'supertest';
import { WoodcuttingModule } from '../../woodcutting.module';
import { TreeMockBuilder } from '../mock/tree.mock-builder';

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

  afterAll(async () => {
    await app.close();
  });

  it('should fetch trees', () => {
    //WHEN
    const tree1 = new TreeMockBuilder('Tree')
      .withId(1)
      .withReward({ experience: 10 });
    const tree2 = new TreeMockBuilder('Tree 2')
      .withId(2)
      .withReward({ experience: 20 });
    jest
      .spyOn(osrsWikiApiService, 'fetchTrees')
      .mockResolvedValue([tree1, tree2]);

    //THEN
    return request(app.getHttpServer())
      .get('/skills/woodcutting/trees')
      .expect(200)
      .expect({
        trees: [
          {
            id: 1,
            name: 'Tree',
            image: 'image/url',
            reward: {
              experience: 10,
              items: [],
            },
          },
          {
            id: 2,
            name: 'Tree 2',
            image: 'image/url',
            reward: {
              experience: 20,
              items: [],
            },
          },
        ],
      });
  });
});
