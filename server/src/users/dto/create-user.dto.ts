import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  readonly address: string;

  @IsNotEmpty()
  readonly phone: string;

  readonly role: string;
}
