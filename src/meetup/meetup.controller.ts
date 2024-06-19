import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { MeetupService } from './meetup.service';
import { CreateMeetupDto } from './dto/create-meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';

@Controller('meetup')
export class MeetupController {
  constructor(private readonly meetupService: MeetupService) {}

  @HttpCode(201)
  @Post()
  async create(@Body() createMeetupDto: CreateMeetupDto) {
    return this.meetupService.create(createMeetupDto);
  }

  @HttpCode(200)
  @Get()
  async findAll() {
    return this.meetupService.findAll();
  }

  @HttpCode(200)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.meetupService.findOne(+id);
  }

  @HttpCode(200)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMeetupDto: UpdateMeetupDto) {
    return this.meetupService.update(+id, updateMeetupDto);
  }

  @HttpCode(200)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.meetupService.remove(+id);
  }
}
