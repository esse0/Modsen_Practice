import { Controller, Post, Body,  HttpCode, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { GetCurrentUser } from 'src/common/decorators';
import { RtGuard } from 'src/common/guards';
import { Request, Response } from 'express';
import { ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from './dto/user-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @HttpCode(200)
  @Post('signin')
  @ApiResponse({
    status: 200,
    description: 'OK',
    headers: {
      'Set-Cookie': {
        description: 'Set-Cookie header for access and refresh tokens',
        schema: {
          type: 'string',
          example: [
            'accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9; Path=/; SameSite=Strict',
            'refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9; Path=/; HttpOnly; SameSite=Strict',
          ],
        },
      },
    },
  })
  @ApiResponse({ status: 403, description: 'Access denied'})
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
  @ApiResponse({ status: 200, description: 'OK', type: UserResponseDto})
  @ApiResponse({ status: 400, description: 'Email already exists'})
  async signUp(@Body() signUpDto: SignUpAuthDto): Promise<UserResponseDto> {
    return this.authService.signUp(signUpDto);
  }

  @ApiSecurity('refresh-token')
  @UseGuards(RtGuard)
  @HttpCode(200)
  @Post('refresh')
  @ApiResponse({
    status: 200,
    description: 'OK',
    headers: {
      'Set-Cookie': {
        description: 'Set-Cookie header for access and refresh tokens',
        schema: {
          type: 'string',
          example: [
            'accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9; Path=/; SameSite=Strict',
            'refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9; Path=/; HttpOnly; SameSite=Strict',
          ],
        },
      },
    },
  })
  @ApiResponse({ status: 403, description: 'Access denied'})
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
