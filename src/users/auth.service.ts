import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(email: string, password: string) {
    const [user] = await this.usersService.find(email);

    // If no user with the given mail found throw error.
    if (!user) {
      throw new NotFoundException('Failed to sign in');
    }

    // Get the stored user's password, split it and get salt and hash
    const [salt, storedHash] = user.password.split('.');

    // Hash the given password
    const passwordHash = (await scrypt(password, salt, 32)) as Buffer;

    // Compare the given hash password and the stored hash password. If not the same throw error.
    if (storedHash !== passwordHash.toString('hex')) {
      throw new BadRequestException('Invalid Credentials');
    }
    return user;
  }

  async signUp(email: string, password: string) {
    // See if email is in use
    const users = await this.usersService.find(email);

    if (users.length) {
      throw new BadRequestException('Email already exists');
    }

    // Hash the user's password
    //    1. Generate a salt
    const salt = randomBytes(8).toString('hex');
    //    2. Hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    //    3. Join the hash result and the salt together
    const result = `${salt}.${hash.toString('hex')}`;

    // Create new user and save it
    // Return the user
    return this.usersService.create(email, result);
  }
}
