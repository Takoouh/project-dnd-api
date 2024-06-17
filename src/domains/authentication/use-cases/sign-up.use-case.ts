import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/domains/users/users.service';
import { AuthenticationService } from '../authentication.service';
import { LoginInfos } from '../types/login-infos.type';
import { NicknameAlreadyTaken } from '../exceptions/nickname-taken.exception';

@Injectable()
export class SignUpUseCase {
  constructor(
    private readonly usersService: UsersService,
    private readonly authenticationService: AuthenticationService,
    private readonly jwtService: JwtService,
  ) {}

  public async execute({
    nickname,
    password,
  }: LoginInfos): Promise<Record<string, any>> {
    // Check if nickname is taken
    const isNicknameAlreadyTaken = await this.usersService.getUser(nickname);
    if (isNicknameAlreadyTaken) {
      throw new NicknameAlreadyTaken();
    }

    //encrypt password
    const hashedPassword =
      await this.authenticationService.encryptPassword(password);

    const user = await this.usersService.createUser({
      nickname,
      password: hashedPassword,
    });
    return {
      user,
      access_token: await this.jwtService.signAsync({ userId: user.id }),
    };
  }
}
