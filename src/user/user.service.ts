import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './models/user.model.js';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { NameEnum, Strings } from '../data/strings.js';
import { errorHandlingService } from '../service/error-handling-service.js';
import { idVerifyService } from '../service/id-verify-service.js';
import { UserPasswordService } from '../service/user-password-service.js';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly userPasswordService: UserPasswordService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    try {
      const user = await this.userModel.findOne({ email: dto.email });
      if (user) {
        throw new HttpException(
          Strings.userWithThisEmailExists,
          HttpStatus.CONFLICT,
        );
      }
      dto.password = await this.userPasswordService.hashPassword(dto.password);
      return this.userModel.create(dto);
    } catch (error) {
      errorHandlingService(error);
    }
  }
  async deleteUser(id: string): Promise<User> {
    try {
      idVerifyService(id);
      const user = await this.userModel.findByIdAndDelete(id);
      if (!user) {
        throw new HttpException(
          Strings.notFoundById(NameEnum.User) + id,
          HttpStatus.NOT_FOUND,
        );
      }
      return user;
    } catch (error) {
      errorHandlingService(error);
    }
  }
  async updateUser(id: string, dto: UpdateUserDto): Promise<User> {
    try {
      idVerifyService(id);
      const user = await this.userModel.findByIdAndUpdate(id, dto, {
        new: true,
      });
      if (!user) {
        throw new HttpException(
          Strings.notFoundById(NameEnum.User),
          HttpStatus.NOT_FOUND,
        );
      }
      return user;
    } catch (error) {
      errorHandlingService(error);
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      idVerifyService(id);

      const user = await this.userModel.findById(id);
      if (!user) {
        throw new HttpException(
          Strings.notFoundById(NameEnum.User) + id,
          HttpStatus.NOT_FOUND,
        );
      }
      return user;
    } catch (error) {
      errorHandlingService(error);
    }
  }
}
