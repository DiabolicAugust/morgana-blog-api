import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthJwtService } from '../../service/jwt/jwt-service.js';
import { Constants } from '../../data/constants.js';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: AuthJwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      console.log(token);
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.decodeJwtToken(token);
      request.query[Constants.client] = payload.id;
    } catch (error) {
      console.log(error.message);
      throw new UnauthorizedException(error.message);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
