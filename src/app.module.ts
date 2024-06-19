import { Module } from '@nestjs/common';
import { MeetupModule } from './meetup/meetup.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [MeetupModule, AuthModule, DatabaseModule],
})
export class AppModule {}
