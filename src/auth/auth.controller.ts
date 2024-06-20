import { Controller, Post, Body,  HttpCode, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { GetCurrentUser } from 'src/common/decorators';
import { RtGuard } from 'src/common/guards';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('signin')
  async signIn(@Body() signInDto: SignInAuthDto) {
    return this.authService.signIn(signInDto);
  }

  @HttpCode(200)
  @Post('signup')
  async signUp(@Body() signUpDto: SignUpAuthDto) {
    return this.authService.signUp(signUpDto);
  }

  @UseGuards(RtGuard)
  @HttpCode(200)
  @Post('refresh')
  refreshTokens(@GetCurrentUser('id') userId, @Req() req: Request){
    this.authService.refreshTokens(userId, req.cookies['refreshToken'])
  }
}
