import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { GetCurrentUserUseCase } from './use-cases/get-current-user.use-case';

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  providers: [UsersService, GetCurrentUserUseCase],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
