import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users') // route: /users
export class UsersController {

  constructor(private usersService: UsersService) {}

  // GET /users
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // POST /users
  @Post()
  create(@Body() body) {
    return this.usersService.create(body);
  }
}