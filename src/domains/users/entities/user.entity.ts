import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { LoginInfos } from '../../authentication/types/login-infos.type';
import { EXPERIENCE_GRID } from '../const/experience-grid';
import { UserDto } from '../dto/user.dto';
import { UserSkillDetail } from '../types/user-skill-detail.type';
import { UserItem } from './user-item.entity';

@Entity()
export class User {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()', hidden: true })
  id: string;

  @Property({ unique: true })
  nickname: string;

  @Property({ hidden: true })
  password: string;

  @OneToMany('UserItem', 'user')
  userItems = new Collection<UserItem>(this);

  //SKILLS
  @Property({ hidden: true, default: 0 })
  cookingXp: number = 0;

  @Property({ hidden: true, default: 0 })
  fishingXp: number = 0;

  @Property({ hidden: true, default: 0 })
  miningXp: number = 0;

  @Property({ hidden: true, default: 0 })
  smithingXp: number = 0;

  @Property({ hidden: true, default: 0 })
  woodcuttingXp: number = 0;

  constructor({ nickname, password }: LoginInfos) {
    this.nickname = nickname;
    this.password = password;
  }

  public toObject(): UserDto {
    return {
      nickname: this.nickname,
      skills: {
        cooking: this.getSkillInfo(this.cookingXp),
        fishing: this.getSkillInfo(this.fishingXp),
        mining: this.getSkillInfo(this.miningXp),
        smithing: this.getSkillInfo(this.smithingXp),
        woodcutting: this.getSkillInfo(this.woodcuttingXp),
      },
    };
  }

  public getSkillInfo(xp): UserSkillDetail {
    const currentLevel = EXPERIENCE_GRID.findIndex(
      (amountOfXp) => amountOfXp > xp,
    );
    const nextLevelXp = EXPERIENCE_GRID[currentLevel + 1];
    return {
      xp,
      level: currentLevel,
      nextLevelXp: nextLevelXp,
    };
  }
}
