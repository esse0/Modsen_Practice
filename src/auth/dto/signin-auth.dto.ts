import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInAuthDto {
  @ApiProperty({ example: "example@gmail.com" })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: "123Password" })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
