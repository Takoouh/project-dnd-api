import { MikroOrmModule } from '@mikro-orm/nestjs';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuardMock } from 'src/domains/authentication/guards/mock/auth.guard.mock';
import { UsersModule } from 'src/domains/users/users.module';
import * as request from 'supertest';

describe('E2E - Move user to location when area does not exist', () => {
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

  it('should return Forbidden exception', async () => {
    //GIVEN
    const areaId = 'place-not-existing';

    //WHEN
    const token = { userId: '86b79cae-cb7c-4c32-8326-b9d279982b20' };

    //THEN
    await request(app.getHttpServer())
      .patch(`/users/me/move/${areaId}`)
      .set('Authorization', JSON.stringify(token))
      .expect(HttpStatus.FORBIDDEN)
      .expect(
        JSON.stringify({
          message: "You can't go there !",
          error: 'Forbidden',
          statusCode: 403,
        }),
      );
  });
});
