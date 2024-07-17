import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from './user.entity';

@Entity({ tableName: 'user_items' })
export class UserItem {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()', hidden: true })
  id: number;

  @ManyToOne('User')
  user!: User;

  @Property()
  itemId: number;

  @Property({ default: 1 })
  quantity: number = 1;

  constructor() {}
}
