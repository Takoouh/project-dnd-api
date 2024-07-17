import { Injectable } from '@nestjs/common';
import { AreasService } from '../areas.service';
import { AreaAction } from '../enums/area-action.enum';

type GetAreaAvailableActionsUseCaseArgs = {
  areaId: string;
};

@Injectable()
export class GetAreaAvailableActionsUseCase {
  constructor(private readonly areasService: AreasService) {}

  async execute({
    areaId,
  }: GetAreaAvailableActionsUseCaseArgs): Promise<AreaAction[]> {
    const area = await this.areasService.getAreaDetail(areaId);

    return area.availableActions;
  }
}
