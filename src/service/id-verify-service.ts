import { HttpException, HttpStatus } from '@nestjs/common';
import { Types } from 'mongoose';
import { Strings } from '../data/strings.js';

export const idVerifyService = (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new HttpException(
      Strings.invalidIdFormat + id,
      HttpStatus.BAD_REQUEST,
    );
  }
};
