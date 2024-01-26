import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({
    message: 'Email field is empty or was not added!',
  })
  @IsEmail({}, { message: 'Something wrong with your email!' })
  email: string;
  @IsNotEmpty({
    message: 'Password field is empty or was not added!',
  })
  password: string;
  @IsNotEmpty({
    message: 'Name field is empty or was not added!',
  })
  name: string;
}
