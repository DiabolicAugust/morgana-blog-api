import { HttpException, HttpStatus } from '@nestjs/common';
import { Types } from 'mongoose';
import { Strings } from '../data/strings.js';
import { User } from '../user/models/user.model.js';
import { ReturnUserDto } from '../user/dto/return-user.dto.js';

export const idVerify = (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new HttpException(
      Strings.invalidIdFormat + id,
      HttpStatus.BAD_REQUEST,
    );
  }
};

export const getReturnUser = (user: User): ReturnUserDto => {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
