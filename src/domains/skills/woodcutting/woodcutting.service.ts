import { Injectable } from '@nestjs/common';
import { Tree } from './types/tree.type';
import { OsrsWikiApiService } from 'src/domains/_external/osrs-wiki-api/osrs-wiki-api.service';

@Injectable()
export class WoodcuttingService {
  constructor(private readonly osrsApiService: OsrsWikiApiService) {}

  public fetchTrees(): Promise<Tree[]> {
    return this.osrsApiService.fetchTrees();
  }
}
