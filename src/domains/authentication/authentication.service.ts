import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
  private saltOrRounds: number = 10;

  public async encryptPassword(password): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, this.saltOrRounds);
    return hashedPassword;
  }

  public async verifyPassword(password, hashedPassword): Promise<Boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
