import { Injectable } from '@nestjs/common';
import { AreasService } from '../areas.service';
import { Area } from '../entities/area.entity';

@Injectable()
export class GetUnlockedAreasUseCase {
  constructor(private readonly areasService: AreasService) {}

  public async execute(): Promise<Area[]> {
    return this.areasService.getUnlockedAreas();
  }
}
