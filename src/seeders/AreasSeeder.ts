import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { User } from '../domains/users/entities/user.entity';
import { Area } from 'src/domains/areas/entities/area.entity';
import { AreaGroup } from 'src/domains/areas/enums/area-group.enum';

export class AreasSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    em.create(Area, {
      id: 'area-test-1',
      name: 'Area Test 1',
      areaGroup: AreaGroup.town,
      isAvailable: true,
      trees: ['Tree'],
      miningRocks: ['rock'],
      monsters: ['Rat'],
      hasInn: true,
    });
    em.create(Area, {
      id: 'area-test-unavailable',
      name: 'Area Test unavailable',
      areaGroup: AreaGroup.town,
      isAvailable: false,
    });
  }
}
