import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { AuthGuard } from '../guards/auth.guard.js';
import { PayloadDto } from '../service/jwt/dto/payload.dto.js';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  @UsePipes(ValidationPipe)
  async deleteUser(@Param('id') id: string, @Request() req: Request) {
    console.log(req['token_info'] as PayloadDto);
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
