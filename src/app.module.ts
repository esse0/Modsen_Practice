import { Module } from '@nestjs/common';
import { MeetupModule } from './meetup/meetup.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MeetupModule, AuthModule],
})
export class AppModule {}
