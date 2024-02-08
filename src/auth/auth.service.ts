import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import { LoginDto } from './dto/login.dto.js';
import * as bcrypt from 'bcrypt';
import { AuthJwtService } from '../service/jwt-service.js';
import { CreateUserDto } from '../user/dto/create-user.dto.js';
import { getReturnUser } from '../service/functions.js';
import { ReturnUserDto } from '../user/dto/return-user.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly authJwtService: AuthJwtService,
  ) {}

  async login(dto: LoginDto): Promise<{ user: ReturnUserDto; token: string }> {
    const user = await this.userService.getLoginUser(dto.email, dto.password);
    const token = await this.authJwtService.generateJwtToken(user);

    return {
      user: user,
      token: token,
    };
  }

  async registration(dto: CreateUserDto) {
    const user = this.userService.createUser(dto);
    return user;
  }
}
