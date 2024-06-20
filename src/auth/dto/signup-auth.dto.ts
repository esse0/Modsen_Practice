import { PartialType } from '@nestjs/mapped-types';
import { SignInAuthDto } from './signin-auth.dto'
import { IsEnum, IsNotEmpty, NotContains } from 'class-validator';
import { Roles } from 'src/common/roles.enum';

export class SignUpAuthDto extends PartialType(SignInAuthDto) {
    @NotContains(" ")
    @IsNotEmpty()
    @IsEnum(Roles)
    role: string;
}
