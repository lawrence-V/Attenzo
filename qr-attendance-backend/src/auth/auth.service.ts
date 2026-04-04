import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // 🔐 GENERATE TOKENS
  private async generateTokens(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const access_token = this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
      expiresIn: '15m',
    });

    const refresh_token = this.jwtService.sign(payload, {
      secret: jwtConstants.refreshSecret,
      expiresIn: '7d',
    });

    // 🔥 STORE refresh token in DB (hashed)
    await this.usersService.updateRefreshToken(user.id, refresh_token);

    return { access_token, refresh_token };
  }
  // private generateTokens(user: any) {
  //   const payload = {
  //     sub: user.id,
  //     email: user.email,
  //     role: user.role,
  //   };

  //   const access_token = this.jwtService.sign(payload, {
  //     secret: jwtConstants.secret,
  //     expiresIn: '15m',
  //   });

  //   const refresh_token = this.jwtService.sign(payload, {
  //     secret: jwtConstants.refreshSecret,
  //     expiresIn: '7d',
  //   });

  //   return { access_token, refresh_token };
  // }

  // REGISTER
  async register(data: any) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.usersService.create({
      ...data,
      password: hashedPassword,
    });

    return this.generateTokens(user);
  }

  // LOGIN
  async login(data: any) {
    const user = await this.usersService.findByEmail(data.email);

    if (!user) throw new UnauthorizedException('User not found');

    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    return this.generateTokens(user);
  }

  async logout(userId: number) {
    await this.usersService.updateRefreshToken(userId, null);

    return {
      message: 'Logged out successfully',
    };
  }

  // async refreshToken(token: string) {
  //   try {
  //     const payload = this.jwtService.verify(token, {
  //       secret: jwtConstants.refreshSecret,
  //     });

  //     const user = await this.usersService.findByEmail(payload.email);

  //     if (!user) throw new UnauthorizedException();

  //     // generate new access token only
  //     const access_token = this.jwtService.sign(
  //       {
  //         sub: user.id,
  //         email: user.email,
  //         role: user.role,
  //       },
  //       {
  //         secret: jwtConstants.secret,
  //         expiresIn: '15m',
  //       },
  //     );

  //     return { access_token };
  //   } catch (e) {
  //     throw new UnauthorizedException('Invalid refresh token');
  //   }
  // }
  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: jwtConstants.refreshSecret,
      });

      // 🔥 check DB (not just JWT)
      const user = await this.usersService.getUserIfRefreshTokenMatches(
        payload.email,
        refreshToken,
      );

      if (!user) throw new UnauthorizedException('Access denied');

      const newAccessToken = this.jwtService.sign(
        {
          sub: user.id,
          email: user.email,
          role: user.role,
        },
        {
          secret: jwtConstants.secret,
          expiresIn: '15m',
        },
      );

      return { access_token: newAccessToken };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}