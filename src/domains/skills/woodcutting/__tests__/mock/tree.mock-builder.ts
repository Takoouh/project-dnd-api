import { Reward } from 'src/domains/_types/reward.type';
import { Tree } from '../../types/tree.type';

export class TreeMockBuilder implements Tree {
  id: number;
  image: string;
  name: string;
  reward: Reward;

  constructor(name: string) {
    this.id = 123;
    this.image = 'image/url';
    this.name = name || 'Tree';
    this.reward = {
      experience: 10,
      items: [],
    };
  }

  public withId(id: number): TreeMockBuilder {
    this.id = id;
    return this;
  }

  public withReward({ experience }: { experience?: number }): TreeMockBuilder {
    this.reward.experience = experience;
    return this;
  }
}
