import { Injectable } from '@nestjs/common';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { SignUpAuthDto } from './dto/signup-auth.dto';

@Injectable()
export class AuthService {
  signUp(signUpAuthDto: SignInAuthDto) {
    return null;
  }

  signIn(signInAuthDto: SignUpAuthDto) {
    return null;
  }
}
