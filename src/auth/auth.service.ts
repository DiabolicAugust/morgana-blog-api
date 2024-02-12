import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import { LoginDto } from './dto/login.dto.js';
import * as bcrypt from 'bcrypt';
import { AuthJwtService } from '../service/jwt/jwt-service.js';
import { CreateUserDto } from '../user/dto/create-user.dto.js';
import { getReturnUser } from '../service/functions.js';
import { ReturnUserDto } from '../user/dto/return-user.dto.js';
import { errorHandlingService } from '../service/error-handling-service.js';
import { User } from '../user/models/user.model.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly authJwtService: AuthJwtService,
  ) {}

  async login(dto: LoginDto): Promise<{ user: ReturnUserDto; token: string }> {
    try {
      const user = await this.userService.getLoginUser(dto.email, dto.password);

      const token = await this.authJwtService.generateJwtToken(user);

      return {
        user: user,
        token: token,
      };
    } catch (error) {
      throw errorHandlingService(error);
    }
  }

  async registration(dto: CreateUserDto) {
    const user = this.userService.createUser(dto);
    return user;
  }
}
