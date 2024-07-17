import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { PublicRoute } from './decorators/public-route.decorator';
import { LoginResponse } from './dto/login-response.dto';
import { LoginInfos } from './types/login-infos.type';
import { SignInUseCase } from './use-cases/sign-in.use-case';
import { SignUpUseCase } from './use-cases/sign-up.use-case';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly signUpUseCase: SignUpUseCase,
    private readonly signInUseCase: SignInUseCase,
  ) {}

  @PublicRoute()
  @HttpCode(HttpStatus.CREATED)
  @Post('/sign-up')
  public async signUp(@Body() loginInfos: LoginInfos): Promise<LoginResponse> {
    return this.signUpUseCase.execute(loginInfos);
  }

  @PublicRoute()
  @HttpCode(HttpStatus.OK)
  @Post('/sign-in')
  public async signIn(@Body() loginInfos: LoginInfos): Promise<LoginResponse> {
    return this.signInUseCase.execute(loginInfos);
  }
}
