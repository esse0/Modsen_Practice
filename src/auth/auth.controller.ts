import { Controller, Post, Body,  HttpCode, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { GetCurrentUser } from 'src/common/decorators';
import { RtGuard } from 'src/common/guards';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('signin')
  async signIn(@Body() signInDto: SignInAuthDto, @Res({ passthrough: true }) response: Response) {
    const {access_token, refresh_token} = await this.authService.signIn(signInDto);

    response.cookie('accessToken', access_token, {
      sameSite: 'strict'
    });

   response.cookie('refreshToken', refresh_token, {
    httpOnly: true,
    sameSite: 'strict'
   });
  }

  @HttpCode(200)
  @Post('signup')
  async signUp(@Body() signUpDto: SignUpAuthDto) {
    return this.authService.signUp(signUpDto);
  }

  @UseGuards(RtGuard)
  @HttpCode(200)
  @Post('refresh')
  async refreshTokens(@GetCurrentUser('id') userId, @Req() req: Request, @Res({ passthrough: true }) response: Response){
    const {access_token, refresh_token} = await this.authService.refreshTokens(userId, req.cookies['refreshToken']);

    response.cookie('accessToken', access_token, {
      sameSite: 'strict'
    });

    response.cookie('refreshToken', refresh_token, {
      httpOnly: true,
      sameSite: 'strict'
    });
  }
}
