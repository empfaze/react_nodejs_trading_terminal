import { IsEmail, IsString } from 'class-validator';

export class UserSignupDto {
  @IsEmail({}, { message: 'Incorrect email' })
  email: string;

  @IsString({ message: 'Incorrect password' })
  password: string;

  @IsString({ message: 'No name has been provided' })
  name: string;
}
