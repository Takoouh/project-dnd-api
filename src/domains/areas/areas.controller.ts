import { Controller, Get, Param } from '@nestjs/common';
import { Area } from './entities/area.entity';
import { GetUnlockedAreasUseCase } from './use-cases/get-unlocked-areas.use-case';
import { AreaAction } from './enums/area-action.enum';
import { GetAreaAvailableActionsUseCase } from './use-cases/get-area-available-actions.use-case';

@Controller('/areas')
export class AreasController {
  constructor(
    private readonly getUnlockedAreasUseCase: GetUnlockedAreasUseCase,
    private readonly getAreaAvailableActionsUseCase: GetAreaAvailableActionsUseCase,
  ) {}

  @Get('/')
  getUnlockedAreas(): Promise<Area[]> {
    return this.getUnlockedAreasUseCase.execute();
  }

  @Get('/:areaId/available-actions')
  getAreaAvailableActions(
    @Param('areaId') areaId: string,
  ): Promise<AreaAction[]> {
    return this.getAreaAvailableActionsUseCase.execute({ areaId });
  }
}
