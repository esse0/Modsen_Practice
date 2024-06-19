import { PartialType } from '@nestjs/mapped-types';
import { CreateMeetupDto } from './create-meetup.dto';

export class UpdateMeetupDto extends PartialType(CreateMeetupDto) {}
