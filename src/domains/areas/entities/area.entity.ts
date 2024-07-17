import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core';
import { AreaGroup } from '../enums/area-group.enum';
import { AreaAction } from '../enums/area-action.enum';

@Entity({ tableName: 'areas' })
export class Area {
  @PrimaryKey({ unique: true })
  id: string;

  @Property()
  name: string;

  @Enum(() => AreaGroup)
  areaGroup: AreaGroup;

  @Property({ default: false })
  isAvailable: boolean = false;

  @Property({ default: [] })
  trees: string[] = [];

  @Property({ default: [] })
  miningRocks: string[] = [];

  @Property({ default: [] })
  monsters: string[] = [];

  @Property({ default: false })
  hasInn: boolean = false;

  @Property({ nullable: true })
  unlockedBy: string;

  get availableActions(): AreaAction[] {
    const actions = [];

    if (this.hasInn) actions.push(AreaAction.Inn);
    if (this.trees.length) actions.push(AreaAction.Woodcutting);
    if (this.miningRocks.length) actions.push(AreaAction.Mining);
    if (this.monsters.length) actions.push(AreaAction.Explore);

    return actions;
  }
}
