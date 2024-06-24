import { Request, Response } from 'express';
import { Controller, Post, Body,  HttpCode, UseGuards, Req, Res } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { GetCurrentUser } from 'src/common/decorators';
import { RtGuard } from 'src/common/guards';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { CustomResponseDto } from 'src/common/dto/custom-response.dto';
import { UserResponseDto } from './dto/user-response.dto';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  
  @ApiResponse({
    status: 200,
    description: 'Successful response',
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
    type: CustomResponseDto,
  })
  @ApiForbiddenResponse({description:'Access denied', type: CustomResponseDto})
  @ApiBadRequestResponse({ description: 'Bad request', type: CustomResponseDto})
  @ApiInternalServerErrorResponse({ description: 'Internal server error', type: CustomResponseDto })
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

  @ApiCreatedResponse({ description: 'Successful response', type: CustomResponseDto })
  @ApiBadRequestResponse({ description: 'Bad request', type: CustomResponseDto })
  @ApiInternalServerErrorResponse({ description: 'Internal server error', type: CustomResponseDto })
  @HttpCode(201)
  @Post('signup')
  async signUp(@Body() signUpDto: SignUpAuthDto): Promise<UserResponseDto> {
    return this.authService.signUp(signUpDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Successful response',
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
    type: CustomResponseDto,
  })
  @ApiForbiddenResponse({ description: 'Access denied', type: CustomResponseDto })
  @ApiInternalServerErrorResponse({ description: 'Internal server error', type: CustomResponseDto })
  @ApiSecurity('refresh-token')
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
