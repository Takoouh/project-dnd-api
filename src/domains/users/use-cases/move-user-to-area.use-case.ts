import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';
import { UserDto } from '../dto/user.dto';
import { AreasService } from 'src/domains/areas/areas.service';

type MoveUserToAreaUseCaseArgs = {
  userId: string;
  areaId: string;
};

@Injectable()
export class MoveUserToAreaUseCase {
  constructor(
    private readonly usersService: UsersService,
    private readonly areasService: AreasService,
  ) {}

  public async execute({
    userId,
    areaId,
  }: MoveUserToAreaUseCaseArgs): Promise<UserDto> {
    //check if area exist and is reachable
    const area = await this.areasService.getAreaDetail(areaId);

    if (!area || !area.isAvailable) {
      throw new ForbiddenException("You can't go there !");
    }

    //move user
    const user = await this.usersService.moveUserToArea(userId, areaId);
    return user.toObject();
  }
}
