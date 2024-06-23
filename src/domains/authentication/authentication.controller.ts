import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { LoginInfos } from './types/login-infos.type';
import { SignInUseCase } from './use-cases/sign-in.use-case';
import { SignUpUseCase } from './use-cases/sign-up.use-case';
import { PublicRoute } from './decorators/public-route.decorator';

@Controller('')
export class AuthenticationController {
  #isProd = this.configService.get('NODE_ENV') === 'production';

  #cookiesOptions = {
    signed: true,
    httpOnly: true,
    sameSite: 'none' as 'none', // TS doesn't like 'none' alone
    secure: this.#isProd,
  };

  constructor(
    private readonly configService: ConfigService,
    private readonly signUpUseCase: SignUpUseCase,
    private readonly signInUseCase: SignInUseCase,
  ) {}

  @PublicRoute()
  @HttpCode(HttpStatus.CREATED)
  @Post('/sign-up')
  public async signUp(
    @Body() loginInfos: LoginInfos,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Record<string, any>> {
    const { user, access_token } = await this.signUpUseCase.execute(loginInfos);
    res.cookie('access_token', access_token, this.#cookiesOptions);
    return user;
  }

  @PublicRoute()
  @HttpCode(HttpStatus.OK)
  @Post('/sign-in')
  public async signIn(
    @Body() loginInfos: LoginInfos,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Record<string, any>> {
    const { user, access_token } = await this.signInUseCase.execute(loginInfos);
    res.cookie('access_token', access_token, this.#cookiesOptions);
    return user;
  }
}
