import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationService } from '../authentication.service';
import { UsersService } from 'src/domains/users/users.service';
import { LoginInfos } from '../types/login-infos.type';
import { SignInError } from '../exceptions/sign-in-error.exception';

@Injectable()
export class SignInUseCase {
  constructor(
    private readonly usersService: UsersService,
    private readonly authenticationService: AuthenticationService,
    private readonly jwtService: JwtService,
  ) {}

  public async execute(loginInfos: LoginInfos): Promise<Record<string, any>> {
    const user = await this.usersService.getUser(loginInfos.nickname);
    if (!user) {
      throw new SignInError();
    }

    //check password
    const isPasswordCorrect = await this.authenticationService.verifyPassword(
      loginInfos.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new SignInError();
    }

    const access_token = await this.jwtService.signAsync({
      userId: user.id,
    });
    return {
      user,
      access_token,
    };
  }
}
