import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  // Create user
  create(data: Partial<User>) {
    return this.userRepo.save(data);
  }

  // Get all users
  findAll() {
    return this.userRepo.find();
  }

  async findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  async updateRefreshToken(userId: number, token: string | null) {
    const hashedToken = token ? await bcrypt.hash(token, 10) : undefined;

    await this.userRepo.update(userId, {
      hashedRefreshToken: hashedToken,
    });
  }

  async getUserIfRefreshTokenMatches(email: string, refreshToken: string) {
    const user = await this.findByEmail(email);

    if (!user || !user.hashedRefreshToken) return null;

    const isMatch = await bcrypt.compare(refreshToken, user.hashedRefreshToken);

    if (!isMatch) return null;

    return user;
  }

  async logout(userId: number) {
    await this.updateRefreshToken(userId, null);

    return {
      message: 'Logged out successfully',
    };
  }
}