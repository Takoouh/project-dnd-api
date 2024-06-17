import { ConflictException } from '@nestjs/common';

export class NicknameAlreadyTaken extends ConflictException {
  constructor() {
    super('This Nickname is already taken');
  }
}
