import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostShema } from './models/post.model.js';
import { AuthJwtService } from '../service/jwt/jwt-service.js';

@Module({
  providers: [PostService, AuthJwtService],
  controllers: [PostController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Post.name,
        schema: PostShema,
      },
    ]),
  ],
})
export class PostModule {}
