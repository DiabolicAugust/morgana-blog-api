import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsString({ message: 'Email must be a string' })
  email: string;
}
