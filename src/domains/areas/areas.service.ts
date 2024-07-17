import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { AreaRepository } from './repositories/area.repository';
import { Area } from './entities/area.entity';

@Injectable()
export class AreasService {
  constructor(
    @InjectRepository(Area)
    private readonly areaRepository: AreaRepository,
  ) {}

  public getUnlockedAreas(): Promise<Area[]> {
    return this.areaRepository.find({ isAvailable: true });
  }

  async getAreaDetail(areaId: string): Promise<Area> {
    return this.areaRepository.findOne({ id: areaId });
  }
}
