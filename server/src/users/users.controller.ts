import { Body, Controller, Get, Headers, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @Put()
  update(
    @Body() userDto: CreateUserDto,
    @Headers('authorization') authorization,
  ) {
    return this.usersService.update(authorization, userDto);
  }

  @Get()
  get(@Headers('authorization') authorization) {
    return this.usersService.get(authorization);
  }
}
