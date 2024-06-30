import { UserDto } from 'src/domains/users/dto/user.dto';

export class LoginResponse {
  user: UserDto;
  accessToken: string;
}
