import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UserService } from './user.service.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @UsePipes(ValidationPipe)
  async createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Delete('delete/:id')
  @UsePipes(ValidationPipe)
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Patch('update/:id')
  @UsePipes(ValidationPipe)
  async updateUser(@Body() dto: UpdateUserDto, @Param('id') id: string) {
    return this.userService.updateUser(id, dto);
  }

  @Get('getUserById/:id')
  @UsePipes(ValidationPipe)
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }
}
