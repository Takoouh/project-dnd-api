import { User } from 'src/domains/users/entities/user.entity';

export class LoginResponse {
  user: User;
  accessToken: string;
}
