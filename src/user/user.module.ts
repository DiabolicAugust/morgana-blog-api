import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user.model.js';
import { UserPasswordService } from '../service/user-password-service.js';

@Module({
  controllers: [UserController],
  providers: [UserService, UserPasswordService],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
})
export class UserModule {}
