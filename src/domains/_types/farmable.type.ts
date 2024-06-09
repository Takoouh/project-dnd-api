import { Reward } from './reward.type';

export type Farmable = {
  id: number;
  name: string;
  image: string;
  reward: Reward;
};
