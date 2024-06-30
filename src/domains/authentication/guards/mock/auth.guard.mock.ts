import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_ROUTE_KEY } from '../../decorators/public-route.decorator';

@Injectable()
export class AuthGuardMock implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublicRoute = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_ROUTE_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (isPublicRoute) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = JSON.parse(request.headers.authorization);
    if (!token) {
      throw new UnauthorizedException();
    }

    request['userId'] = token.userId;

    return true;
  }
}
