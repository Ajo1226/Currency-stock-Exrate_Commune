import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  const users: User[] = [];
  beforeEach(async () => {
    // Create  fake copy of the users service
    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 999999),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: fakeUsersService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('Can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('Creates a new user with salted and hashed password', async () => {
    const user = await service.signUp('user.testCase1@test.com', 'password');
    expect(user.password).not.toEqual('password');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('Throws an error if user signs up with email that is in use', async () => {
    await service.signUp('user.testCas2@app.com', 'password');
    await expect(
      service.signUp('user.testCas2@app.com', 'asdf'),
    ).rejects.toThrow(BadRequestException);
  });

  it('Throws an error if user with given email does not exist', async () => {
    await expect(
      service.signIn('thereIsNoSuchUser@app.com', 'nowPass'),
    ).rejects.toThrow(NotFoundException);
  });

  it('Throws an error if invalid password is provided', async () => {
    await service.signUp('user.testCase5@app.com', 'password');
    await expect(
      service.signIn('user.testCase5@app.com', 'wrongPassword'),
    ).rejects.toThrow(BadRequestException);
  });

  it('Returns a user if valid password is provided', async () => {
    await service.signUp('user.testCase6@app.com', 'password');
    const user = await service.signIn('user.testCase6@app.com', 'password');
    expect(user).toBeDefined();
  });
});
