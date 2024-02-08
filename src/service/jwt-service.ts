import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PayloadDto } from '../data/dto/payload.dto';
import { ReturnUserDto } from '../user/dto/return-user.dto.js';

@Injectable()
export class AuthJwtService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJwtToken(user: ReturnUserDto): Promise<string> {
    try {
      const payload: PayloadDto = { id: user.id, email: user.email };

      const token = await this.jwtService.signAsync(payload);

      return token;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async decodeJwtToken(token: string): Promise<PayloadDto> {
    try {
      const decodedPayload = (await this.jwtService.verifyAsync(
        token,
      )) as PayloadDto;
      return decodedPayload;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
