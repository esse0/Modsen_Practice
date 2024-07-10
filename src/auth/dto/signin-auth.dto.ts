import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, NotContains } from 'class-validator';

export class SignInAuthDto {
  @ApiProperty({ example: 'example@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  @NotContains(' ')
  readonly email: string;

  @ApiProperty({ example: '123Password' })
  @IsNotEmpty()
  @IsString()
  @NotContains(' ')
  readonly password: string;
}
