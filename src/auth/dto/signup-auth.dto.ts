import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  NotContains,
} from "class-validator";
import { Role } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class SignUpAuthDto {
  @ApiProperty({ example: "example@gmail.com" })
  @IsNotEmpty()
  @IsEmail()
  @NotContains(" ")
  readonly email: string;

  @ApiProperty({ example: "123Password" })
  @IsNotEmpty()
  @IsString()
  @NotContains(" ")
  @Length(5, 20, { message: "Password has to be at between 5 and 20 chars" })
  @Matches(
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{0,25}$/,
    {
      message:
        "The password should contain at least 1 uppercase character, 1 lowercase, 1 number",
    },
  )
  readonly password: string;

  @ApiProperty({ enum: ["ADMIN", "USER"] })
  @NotContains(" ")
  @IsNotEmpty()
  @IsEnum(Role)
  readonly role: string;
}
