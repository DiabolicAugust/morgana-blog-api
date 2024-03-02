import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MSchema } from 'mongoose';
import { User } from '../../user/models/user.model.js';
import { Post } from '../../post/models/post.model.js';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ timestamps: true })
export class Comment {
  @Prop({ required: true })
  description: string;

  @Prop({ type: MSchema.Types.ObjectId, ref: Post.name, required: true })
  post: Post;

  @Prop({ type: MSchema.Types.ObjectId, ref: User.name, required: true })
  author: User;

  id: string;
  createdAt: string;
  updatedAt: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
