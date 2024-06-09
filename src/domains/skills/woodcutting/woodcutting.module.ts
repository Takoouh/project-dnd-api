import { Module } from '@nestjs/common';
import { OsrsWikiApiModule } from 'src/domains/_external/osrs-wiki-api/osrs-wiki-api.module';
import { WoodcuttingService } from './woodcutting.service';
import { GetTreesUseCase } from './use-cases/get-trees.use-case';
import { WoodcuttingController } from './woodcutting.controller';

@Module({
  imports: [OsrsWikiApiModule],
  providers: [WoodcuttingService, GetTreesUseCase],
  controllers: [WoodcuttingController],
})
export class WoodcuttingModule {}
