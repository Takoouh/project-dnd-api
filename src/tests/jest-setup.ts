import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

let orm: MikroORM;
beforeAll(async () => {
  //Set false date
  jest
    .useFakeTimers({
      advanceTimers: true,
      doNotFake: ['nextTick'],
      now: new Date('2020-05-18T12:00:00.000Z'),
    })
    .setSystemTime(new Date('2020-05-18T12:00:00.000Z'));
});

beforeEach(() => {
  jest.clearAllTimers();
});

afterEach(() => {
  jest.restoreAllMocks();
});

/**
 * Auto-closes the module and the application after all tests have been executed.
//  */
afterAll(async () => {
  //reset timers
  jest.runOnlyPendingTimers();
  jest.useRealTimers();

  await orm?.close();
});
