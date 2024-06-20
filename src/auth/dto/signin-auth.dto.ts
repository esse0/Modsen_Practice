import { IsEmail, IsNotEmpty, IsString, Length, Matches, NotContains } from "class-validator";

export class SignInAuthDto {
    @IsNotEmpty()
    @IsEmail()
    @NotContains(" ")
    email: string;

    @IsNotEmpty()
    @IsString()
    @NotContains(" ")
    @Length(5, 20, { message: 'Password has to be at between 5 and 20 chars'})
    @Matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{0,25}$/, 
    {message: 'The password should contain at least 1 uppercase character, 1 lowercase, 1 number'})
    password: string;
}
