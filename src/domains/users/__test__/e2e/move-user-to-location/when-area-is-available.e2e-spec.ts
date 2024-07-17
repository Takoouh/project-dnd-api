import { MikroOrmModule } from '@mikro-orm/nestjs';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuardMock } from 'src/domains/authentication/guards/mock/auth.guard.mock';
import { UsersModule } from 'src/domains/users/users.module';
import * as request from 'supertest';

describe('E2E - Move user to location when area is available', () => {
  let module: TestingModule;
  let app: INestApplication;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [UsersModule, MikroOrmModule.forRoot()],
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

  it('should return User with updated location', async () => {
    //GIVEN
    const areaId = 'area-test-1';

    //WHEN
    const token = { userId: '76b79cae-cb7c-4c32-8326-b9d279982b21' };

    //THEN
    await request(app.getHttpServer())
      .patch(`/users/me/move/${areaId}`)
      .set('Authorization', JSON.stringify(token))
      .expect(HttpStatus.OK)
      .expect(
        JSON.stringify({
          nickname: 'test-user-to-move',
          location: 'area-test-1',
          skills: {
            cooking: { xp: 0, level: 1, nextLevelXp: 174 },
            fishing: { xp: 0, level: 1, nextLevelXp: 174 },
            mining: { xp: 0, level: 1, nextLevelXp: 174 },
            smithing: { xp: 0, level: 1, nextLevelXp: 174 },
            woodcutting: { xp: 0, level: 1, nextLevelXp: 174 },
          },
        }),
      );
  });
});
