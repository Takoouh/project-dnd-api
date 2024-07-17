import { createMock } from '@golevelup/ts-jest';
import { UserRepository } from '../../repositories/user.repository';
import { UsersService } from '../../users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { User } from '../../entities/user.entity';
import { UserMockBuilder } from '../mock/user-mock-builder';

describe('UsersService', () => {
  const persistAndFlushSpy = jest.fn();
  const findOneSpy = jest.fn();

  let usersService: UsersService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: findOneSpy,
            getEntityManager: jest.fn().mockImplementation(() => ({
              persistAndFlush: persistAndFlushSpy,
            })),
          },
        },
      ],
    }).compile();

    usersService = module.get(UsersService);
    await module.close();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('createUser', () => {
    it('should create new user and return it', async () => {
      //GIVEN
      const loginInfos = {
        nickname: 'JohnDo',
        password: 'test',
      };

      //THEN
      await usersService.createUser(loginInfos);
      expect(persistAndFlushSpy).toHaveBeenCalled();
    });
  });

  describe('getUserById', () => {
    it('should find user by id and return it', async () => {
      //GIVEN
      const userId = 'user-id';

      //WHEN
      const user = createMock<User>();
      findOneSpy.mockResolvedValue(user);

      //THEN
      const result = await usersService.getUserById(userId);
      expect(findOneSpy).toHaveBeenCalledWith({ id: userId });
      expect(result).toEqual(user);
    });
  });

  describe('getUserByNickname', () => {
    it('should find user by nickName and return it', async () => {
      //GIVEN
      const nickname = 'nickname';

      //WHEN
      const user = createMock<User>();
      findOneSpy.mockResolvedValue(user);

      //THEN
      const result = await usersService.getUserByNickname(nickname);
      expect(findOneSpy).toHaveBeenCalledWith({ nickname });
      expect(result).toEqual(user);
    });
  });

  describe('moveUserToArea', () => {
    it('should move user to given location', async () => {
      //GIVEN
      const userId = 'test-user';
      const areaId = 'test-location';

      //WHEN
      const user = new UserMockBuilder('userTest').withLocation('somewhere');
      findOneSpy.mockResolvedValue(user);

      //THEN
      const movedUser = await usersService.moveUserToArea(userId, areaId);
      expect(movedUser.location).toEqual(areaId);
    });
  });
});
