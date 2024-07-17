import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { GetCurrentUserUseCase } from './use-cases/get-current-user.use-case';
import { MoveUserToAreaUseCase } from './use-cases/move-user-to-area.use-case';
import { AreasModule } from '../areas/areas.module';

@Module({
  imports: [MikroOrmModule.forFeature([User]), AreasModule],
  providers: [UsersService, GetCurrentUserUseCase, MoveUserToAreaUseCase],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
