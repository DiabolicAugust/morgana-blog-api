import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsString({ message: 'Description field can not be empty' })
  @IsNotEmpty({
    message: 'Description field must contain a string, not other types',
  })
  description: string;
}
