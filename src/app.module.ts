import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { OsrsWikiApiModule } from './domains/_external/osrs-wiki-api/osrs-wiki-api.module';
import { WoodcuttingModule } from './domains/skills/woodcutting/woodcutting.module';
import { AppLoggerMiddleware } from './middlewares/app-logger.middleware';

@Module({
  imports: [WoodcuttingModule, OsrsWikiApiModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
