import { Controller, Get, HttpCode, HttpStatus, Request } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { GetCurrentUserUseCase } from './use-cases/get-current-user.use-case';

@Controller('/users')
export class UsersController {
  constructor(private readonly getCurrentUserUseCase: GetCurrentUserUseCase) {}

  @HttpCode(HttpStatus.OK)
  @Get('/me')
  getUser(@Request() { userId }: { userId: string }): Promise<UserDto> {
    return this.getCurrentUserUseCase.execute({ userId });
  }
}
