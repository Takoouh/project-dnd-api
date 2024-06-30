import { Injectable } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { UsersService } from '../users.service';

@Injectable()
export class GetCurrentUserUseCase {
  constructor(private readonly usersService: UsersService) {}

  public async execute({ userId }: { userId: string }): Promise<UserDto> {
    const user = await this.usersService.getUserById(userId);

    return user.toObject();
  }
}
