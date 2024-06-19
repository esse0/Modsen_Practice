import { Injectable } from '@nestjs/common';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: DatabaseService) {}

  async signUp(signUpAuthDto: SignInAuthDto) {
    return null;
  }

  async signIn(signInAuthDto: SignUpAuthDto) {
    return null;
  }
}
