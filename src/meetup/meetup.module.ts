import { Module } from '@nestjs/common';
import { MeetupService } from './meetup.service';
import { MeetupController } from './meetup.controller';

@Module({
  controllers: [MeetupController],
  providers: [MeetupService],
})
export class MeetupModule {}
