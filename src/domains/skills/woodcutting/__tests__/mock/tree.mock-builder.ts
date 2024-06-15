import { Reward } from 'src/domains/_types/reward.type';
import { Tree } from '../../types/tree.type';
import { Item } from 'src/domains/_types/item.type';

export class TreeMockBuilder implements Tree {
  id: number;
  image: string;
  name: string;
  experience: number;
  requiredLevel: number;
  respawnTime: number;
  reward: Reward;

  constructor(name: string) {
    this.id = 123;
    this.image = 'image/url';
    this.requiredLevel = 1;
    this.respawnTime = 10;
    (this.experience = 5), (this.name = name || 'Tree');
    this.reward = {
      experience: 10,
      items: [],
    };
  }

  public withId(id: number): TreeMockBuilder {
    this.id = id;
    return this;
  }

  public withReward({
    experience,
    items = [],
  }: {
    experience?: number;
    items?: Item[];
  }): TreeMockBuilder {
    this.reward.experience = experience;
    if (items.length) {
      this.reward.items = items;
    }
    return this;
  }
}
