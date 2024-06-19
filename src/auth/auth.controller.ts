import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { SignUpAuthDto } from './dto/signup-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  signIn(@Body() signInDto: SignInAuthDto) {
    return this.authService.signIn(signInDto);
  }

  @Post()
  signUp(@Body() signUpDto: SignUpAuthDto) {
    return this.authService.signUp(signUpDto);
  }
}
