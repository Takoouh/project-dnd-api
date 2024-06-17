import { UnauthorizedException } from '@nestjs/common';

export class SignInError extends UnauthorizedException {
  constructor() {
    super('Incorrect password');
  }
}
