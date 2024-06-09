import { Injectable } from '@nestjs/common';
import { Tree } from '../types/tree.type';
import { WoodcuttingService } from '../woodcutting.service';

@Injectable()
export class GetTreesUseCase {
  constructor(private readonly woodcuttingService: WoodcuttingService) {}

  async execute(): Promise<{ trees: Tree[] }> {
    const trees = await this.woodcuttingService.fetchTrees();
    return { trees };
  }
}
