import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Request,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { GetCurrentUserUseCase } from './use-cases/get-current-user.use-case';
import { MoveUserToAreaUseCase } from './use-cases/move-user-to-area.use-case';

@Controller('/users')
export class UsersController {
  constructor(
    private readonly getCurrentUserUseCase: GetCurrentUserUseCase,
    private readonly moveUserToAreaUseCase: MoveUserToAreaUseCase,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get('/me')
  getUser(@Request() { userId }: { userId: string }): Promise<UserDto> {
    return this.getCurrentUserUseCase.execute({ userId });
  }

  @HttpCode(HttpStatus.OK)
  @Patch('/me/move/:areaId')
  moveUserToArea(
    @Request() { userId }: { userId: string },
    @Param('areaId') areaId: string,
  ) {
    return this.moveUserToAreaUseCase.execute({ userId, areaId });
  }
}
