import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { User } from '../domains/users/entities/user.entity';

export class UserSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    em.create(User, {
      nickname: 'test-user',
      password: 'test-password',
      id: '86b79cae-cb7c-4c32-8326-b9d279982b20',
    });
    em.create(User, {
      nickname: 'test-user-to-move',
      password: 'test-password',
      id: '76b79cae-cb7c-4c32-8326-b9d279982b21',
    });
  }
}
