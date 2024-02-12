import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../user/models/user.model.js';
import { Schema as MShema, HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema({ timestamps: true })
export class Post {
  @Prop({ required: true })
  description: string;
  @Prop({ type: MShema.Types.ObjectId, ref: User.name, required: true })
  author: User;

  id: string;
  createdAt: string;
  updatedAt: string;
}

export const PostShema = SchemaFactory.createForClass(Post);
