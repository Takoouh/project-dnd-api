import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { Tree } from './types/tree.type';
import { GetTreesUseCase } from './use-cases/get-trees.use-case';

@Controller('/skills/woodcutting')
export class WoodcuttingController {
  constructor(private readonly getTreesUseCase: GetTreesUseCase) {}

  @HttpCode(HttpStatus.OK)
  @Get('/trees')
  async getTrees(): Promise<{ trees: Tree[] }> {
    return this.getTreesUseCase.execute();
  }
}
