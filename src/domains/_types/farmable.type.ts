import { Reward } from './reward.type';

export type Farmable = {
  id: number;
  name: string;
  image: string;
  experience: number;
  respawnTime: number;
  requiredLevel: number;
  reward: Reward;
};
