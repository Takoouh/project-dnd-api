import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { LoginInfos } from '../authentication/types/login-infos.type';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: UserRepository,
  ) {}

  async createUser(loginInfos: LoginInfos): Promise<User> {
    const user = new User(loginInfos);
    await this.userRepository.getEntityManager().persistAndFlush(user);
    return user;
  }

  async getUser(nickname: string): Promise<User> {
    return this.userRepository.findOne({ nickname });
  }
}
