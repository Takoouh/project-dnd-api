import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { LoginInfos } from '../../authentication/types/login-infos.type';

@Entity()
export class User {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()', hidden: true })
  id: number;

  @Property({ unique: true })
  nickname: string;

  @Property({ hidden: true })
  password: string;

  constructor({ nickname, password }: LoginInfos) {
    this.nickname = nickname;
    this.password = password;
  }
}
