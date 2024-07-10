import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { DatabaseService } from 'src/database/database.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';
import { Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: DatabaseService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signIn(signInAuthDto: SignInAuthDto) {
    const { email, password } = signInAuthDto;

    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Access denied');
    }

    const passwordMatches = await bcrypt.compare(password, user.hashedPassword);

    if (!passwordMatches) {
      throw new ForbiddenException('Access denied');
    }

    const tokens = await this.getTokens(user.id, user.role);

    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async signUp(signUpAuthDto: SignUpAuthDto) {
    const { email, password, role } = signUpAuthDto;

    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) throw new BadRequestException('Email already exists');

    const hashedPassword = await this.getHash(password);

    const createdUser = await this.prismaService.user.create({
      data: {
        email: email,
        hashedPassword: hashedPassword,
        role: Role[role],
      },
      select: { email: true, role: true },
    });

    return createdUser;
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user || user.refreshToken == null)
      throw new ForbiddenException('Access denied');

    const rtMatches = refreshToken === user.refreshToken;

    if (!rtMatches) throw new ForbiddenException('Access denied');

    const tokens = await this.getTokens(user.id, user.role);

    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async updateRtHash(userId: string, refreshToken: string) {
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken,
      },
    });
  }

  async getTokens(userId: string, role: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: userId,
          role,
        },
        {
          secret: this.configService.get('ACCESS_TOKEN_SECRET'),
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        {
          id: userId,
          role,
        },
        {
          secret: this.configService.get('REFRESH_TOKEN_SECRET'),
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async getHash(data: string) {
    const saltOrRounds = this.configService.get('SaltOrRounds');

    const hashedData = await bcrypt.hash(data, +saltOrRounds);

    return hashedData;
  }
}
