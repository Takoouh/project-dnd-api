import { MikroOrmModule } from '@mikro-orm/nestjs';
import { INestApplication } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { AreasModule } from 'src/domains/areas/areas.module';
import { AuthGuardMock } from 'src/domains/authentication/guards/mock/auth.guard.mock';
import * as request from 'supertest';

describe('E2E - Get unlocked areas', () => {
  let app: INestApplication;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AreasModule, MikroOrmModule.forRoot()],
      providers: [
        {
          provide: APP_GUARD,
          useClass: AuthGuardMock,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await module.close();
  });

  it('should fetch available areas', async () => {
    //WHEN
    const token = { userId: '76b79cae-cb7c-4c32-8326-b9d279982b21' };

    //THEN
    await request(app.getHttpServer())
      .get('/areas')
      .set('Authorization', JSON.stringify(token))
      .expect(200)
      .expect(
        JSON.stringify([
          {
            id: 'area-test-1',
            name: 'Area Test 1',
            areaGroup: 'town',
            isAvailable: true,
            trees: ['Tree'],
            miningRocks: ['rock'],
            monsters: ['Rat'],
            hasInn: true,
            unlockedBy: null,
          },
        ]),
      );
  });
});
