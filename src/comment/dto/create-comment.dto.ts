import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { FieldEnum, Strings } from '../../data/strings.js';

export class CreateCommentDto {
  @IsNotEmpty({ message: Strings.cantBeEmpty(FieldEnum.Description) })
  @IsString({ message: Strings.mustBeString(FieldEnum.Description) })
  description: string;

  @IsOptional()
  author: string;

  @IsNotEmpty({ message: Strings.cantBeEmpty(FieldEnum.Post) })
  @IsString({ message: Strings.mustBeString(FieldEnum.Post) })
  post: string;
}
