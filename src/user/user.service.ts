import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './models/user.model.js';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { ReturnUserDto } from './dto/return-user.dto.js';
import { NameEnum, Strings } from '../data/strings.js';
import { errorHandlingService } from '../service/error-handling-service.js';
import { getReturnUser, idVerify } from '../service/functions.js';
import { UserPasswordService } from '../service/user-password-service.js';
import { Constants } from '../data/constants.js';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly userPasswordService: UserPasswordService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<ReturnUserDto> {
    try {
      const user = await this.userModel.findOne({ email: dto.email });
      if (user) {
        throw new HttpException(
          Strings.userWithThisEmailExists,
          HttpStatus.CONFLICT,
        );
      }
      dto.password = await this.userPasswordService.hashPassword(dto.password);
      const newUser = await this.userModel.create(dto);

      const { password, ...userWithoutPassword } = newUser.toObject();
      return userWithoutPassword;
    } catch (error) {
      throw errorHandlingService(error);
    }
  }
  async deleteUser(id: string): Promise<ReturnUserDto> {
    try {
      idVerify(id);
      const user = await this.userModel
        .findByIdAndDelete(id)
        .select(Constants.extractPassword)
        .exec();
      if (!user) {
        throw new HttpException(
          Strings.notFoundById(NameEnum.User) + id,
          HttpStatus.NOT_FOUND,
        );
      }
      return user;
    } catch (error) {
      throw errorHandlingService(error);
    }
  }
  async updateUser(id: string, dto: UpdateUserDto): Promise<ReturnUserDto> {
    try {
      idVerify(id);
      const user = await this.userModel
        .findByIdAndUpdate(id, dto, {
          new: true,
        })
        .select(Constants.extractPassword)
        .exec();
      if (!user) {
        throw new HttpException(
          Strings.notFoundById(NameEnum.User),
          HttpStatus.NOT_FOUND,
        );
      }
      return user;
    } catch (error) {
      throw errorHandlingService(error);
    }
  }

  async getUserById(id: string): Promise<ReturnUserDto> {
    try {
      idVerify(id);

      const user = await this.userModel
        .findById(id)
        .select(Constants.extractPassword)
        .exec();
      if (!user) {
        throw new HttpException(
          Strings.notFoundById(NameEnum.User) + id,
          HttpStatus.NOT_FOUND,
        );
      }
      return user;
    } catch (error) {
      throw errorHandlingService(error);
    }
  }

  async getLoginUser(email: string, password: string): Promise<ReturnUserDto> {
    try {
      const user = await this.userModel.findOne({ email: email });
      if (!user) {
        throw new HttpException(
          Strings.notFoundByEmail(NameEnum.User) + email,
          HttpStatus.NOT_FOUND,
        );
      }

      await this.userPasswordService.validatePassword(user.password, password);

      return getReturnUser(user);
    } catch (error) {
      throw errorHandlingService(error);
    }
  }
}
