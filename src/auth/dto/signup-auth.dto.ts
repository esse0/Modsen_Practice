import { PartialType } from '@nestjs/mapped-types';
import { SignInAuthDto } from './signin-auth.dto'
import { IsEnum, IsNotEmpty, NotContains } from 'class-validator';
import { Role } from '@prisma/client';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

export class SignUpAuthDto extends PartialType(SignInAuthDto) {
    @ApiProperty({ enum: ['ADMIN', 'USER']})
    @NotContains(" ")
    @IsNotEmpty()
    @IsEnum(Role)
    readonly role: string;
}
