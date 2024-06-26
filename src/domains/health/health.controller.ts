import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';
import { PublicRoute } from '../authentication/decorators/public-route.decorator';

@Controller('health')
export class HealthController {
  constructor() {}

  @Get()
  @PublicRoute()
  @HealthCheck()
  check() {
    return;
  }
}
