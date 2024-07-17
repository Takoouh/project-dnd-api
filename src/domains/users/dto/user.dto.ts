import { UserSkills } from '../types/user-skills.type';

export type UserDto = {
  nickname: string;
  skills: UserSkills;
  location: string;
};
