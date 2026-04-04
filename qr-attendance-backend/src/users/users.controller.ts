import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from 'src/common/enums/roles.enum';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

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
}
