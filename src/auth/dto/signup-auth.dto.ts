import { PartialType } from '@nestjs/mapped-types';
import { SignInAuthDto } from './signin-auth.dto'
import { IsEnum, IsNotEmpty, NotContains } from 'class-validator';
import { Role } from '@prisma/client';

export class SignUpAuthDto extends PartialType(SignInAuthDto) {
    @NotContains(" ")
    @IsNotEmpty()
    @IsEnum(Role)
    readonly role: string;
}
