import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationService } from '../authentication.service';
import { UsersService } from 'src/domains/users/users.service';
import { LoginInfos } from '../types/login-infos.type';
import { SignInError } from '../exceptions/sign-in-error.exception';
import { LoginResponse } from '../dto/login-response.dto';

@Injectable()
export class SignInUseCase {
  constructor(
    private readonly usersService: UsersService,
    private readonly authenticationService: AuthenticationService,
    private readonly jwtService: JwtService,
  ) {}

  public async execute(loginInfos: LoginInfos): Promise<LoginResponse> {
    const user = await this.usersService.getUserByNickname(loginInfos.nickname);
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

    const accessToken = await this.jwtService.signAsync({
      userId: user.id,
    });

    return {
      user: user.toObject(),
      accessToken,
    };
  }
}
