import { Controller, Get, Post, UseGuards, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from 'src/common/enums/roles.enum';
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  // 🔐 ONLY LOGGED-IN USERS
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile() {
    return { message: 'You are authenticated' };
  }

  // 🔥 ADMIN ONLY ROUTE
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('admin')
  adminOnly() {
    return { message: 'Admin access granted' };
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post('logout')
  logout(@Body() body: { userId: number }) {
    return this.authService.logout(body.userId);
  }
}
