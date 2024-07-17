import { User } from '../../entities/user.entity';

export class UserMockBuilder extends User {
  constructor(nickname: string) {
    super({ nickname, password: 'password' });
  }

  public withLocation(areaId: string): this {
    this.location = areaId;
    return this;
  }
}
