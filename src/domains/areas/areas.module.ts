import { Module } from '@nestjs/common';
import { OsrsWikiApiModule } from '../_external/osrs-wiki-api/osrs-wiki-api.module';
import { AreasService } from './areas.service';
import { GetUnlockedAreasUseCase } from './use-cases/get-unlocked-areas.use-case';
import { AreasController } from './areas.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Area } from './entities/area.entity';
import { GetAreaAvailableActionsUseCase } from './use-cases/get-area-available-actions.use-case';

@Module({
  imports: [MikroOrmModule.forFeature([Area]), OsrsWikiApiModule],
  providers: [
    AreasService,
    GetUnlockedAreasUseCase,
    GetAreaAvailableActionsUseCase,
  ],
  exports: [AreasService],
  controllers: [AreasController],
})
export class AreasModule {}
