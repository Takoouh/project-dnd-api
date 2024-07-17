import { EntityRepository } from '@mikro-orm/postgresql';
import { Area } from '../entities/area.entity';

export class AreaRepository extends EntityRepository<Area> {}
