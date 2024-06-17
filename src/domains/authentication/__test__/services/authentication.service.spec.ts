import { AuthenticationService } from '../../authentication.service';

describe('AuthenticationService', () => {
  const authenticationService = new AuthenticationService();

  describe('encryptPassword', () => {
    it('should encrypt password and return it', async () => {
      //GIVEN
      const password = 'password';

      //THEN
      const hashedPassword =
        await authenticationService.encryptPassword(password);
      expect(hashedPassword).not.toBe(password);
    });
  });

  describe('verifyPassword', () => {
    it('should return true when password match hashedPassword', async () => {
      //GIVEN
      const password = 'password';
      const hashedPassword =
        '$2b$10$COGyNIv6YCvYHx1ZZYGHweFLQMAIWihs744urNZTsG1PvdM9YrTP6';

      //THEN
      const isPasswordVerified = await authenticationService.verifyPassword(
        password,
        hashedPassword,
      );
      expect(isPasswordVerified).toBeTruthy();
    });

    it('should return true when password match hashedPassword', async () => {
      //GIVEN
      const password = 'Notpassword';
      const hashedPassword =
        '$2b$10$COGyNIv6YCvYHx1ZZYGHweFLQMAIWihs744urNZTsG1PvdM9YrTP6';

      //THEN
      const isPasswordVerified = await authenticationService.verifyPassword(
        password,
        hashedPassword,
      );
      expect(isPasswordVerified).toBeFalsy();
    });
  });
});
