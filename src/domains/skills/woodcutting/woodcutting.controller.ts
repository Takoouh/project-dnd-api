import { Controller, Get } from '@nestjs/common';
import { Tree } from './types/tree.type';
import { GetTreesUseCase } from './use-cases/get-trees.use-case';

@Controller('/skills/woodcutting')
export class WoodcuttingController {
  constructor(private readonly getTreesUseCase: GetTreesUseCase) {}

  @Get('/trees')
  async getTrees(): Promise<{ trees: Tree[] }> {
    return this.getTreesUseCase.execute();
  }
}
