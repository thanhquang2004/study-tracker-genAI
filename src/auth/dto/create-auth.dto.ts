import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  dob: Date;

  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  occupation: string;
}
