import { Injectable } from '@nestjs/common';
import { CreateMeetupDto } from './dto/create-meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class MeetupService {
  constructor(private readonly prismaService: DatabaseService) {}

  async create(createMeetupDto: CreateMeetupDto) {
    return 'This action adds a new meetup';
  }

  async findAll() {
    return `This action returns all meetup`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} meetup`;
  }

  async update(id: number, updateMeetupDto: UpdateMeetupDto) {
    return `This action updates a #${id} meetup`;
  }

  async remove(id: number) {
    return `This action removes a #${id} meetup`;
  }
}
