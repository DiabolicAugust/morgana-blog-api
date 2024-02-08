import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/models/user.model.js';
import { UserService } from '../user/user.service.js';
import { UserPasswordService } from '../service/user-password-service.js';
import { AuthJwtService } from '../service/jwt-service.js';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [AuthService, UserService, UserPasswordService, AuthJwtService],
  controllers: [AuthController],
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  exports: [AuthJwtService],
})
export class AuthModule {}
