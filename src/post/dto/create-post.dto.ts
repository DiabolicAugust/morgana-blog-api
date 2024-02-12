import { IsNotEmpty, IsString } from 'class-validator';
import { PayloadDto } from '../../service/jwt/dto/payload.dto.js';

export class CreatePostDto {
  @IsString({ message: 'Description must be a string!' })
  @IsNotEmpty({ message: 'Description field cant be empty' })
  description: string;

  author: string;
}
