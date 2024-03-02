import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './models/comment.model.js';
import { AuthJwtService } from '../service/jwt/jwt-service.js';

@Module({
  providers: [CommentService, AuthJwtService],
  controllers: [CommentController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Comment.name,
        schema: CommentSchema,
      },
    ]),
  ],
})
export class CommentModule {}
