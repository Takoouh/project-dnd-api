import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { AuthGuard } from './guards/auth.guard';
import { SignInUseCase } from './use-cases/sign-in.use-case';
import { SignUpUseCase } from './use-cases/sign-up.use-case';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '6300s' },
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  providers: [
    AuthenticationService,
    SignUpUseCase,
    SignInUseCase,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
