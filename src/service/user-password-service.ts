import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Strings } from '../data/strings.js';

@Injectable()
export class UserPasswordService {
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  async validatePassword(userPassword: string, clientPassword: string) {
    const isPasswordValid = await bcrypt.compare(clientPassword, userPassword);

    if (!isPasswordValid) {
      throw new UnauthorizedException(Strings.wrongPassword);
    }
    return isPasswordValid;
  }
}
