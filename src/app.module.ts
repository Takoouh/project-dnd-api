import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OsrsWikiApiModule } from './domains/_external/osrs-wiki-api/osrs-wiki-api.module';
import { WoodcuttingModule } from './domains/skills/woodcutting/woodcutting.module';
import { UsersModule } from './domains/users/users.module';
import { AppLoggerMiddleware } from './middlewares/app-logger.middleware';
import { AuthenticationModule } from './domains/authentication/authentication.module';
import { HealthModule } from './domains/health/health.module';
import { AreasModule } from './domains/areas/areas.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRoot(),
    HealthModule,
    UsersModule,
    AuthenticationModule,
    AreasModule,
    WoodcuttingModule,
    OsrsWikiApiModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
