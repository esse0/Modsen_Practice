import { Controller, Post, Body,  HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { SignUpAuthDto } from './dto/signup-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post()
  async signIn(@Body() signInDto: SignInAuthDto) {
    return this.authService.signIn(signInDto);
  }

  @HttpCode(200)
  @Post()
  async signUp(@Body() signUpDto: SignUpAuthDto) {
    return this.authService.signUp(signUpDto);
  }
}
