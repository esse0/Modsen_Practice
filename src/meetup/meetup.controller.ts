import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards, ParseIntPipe } from '@nestjs/common';
import { MeetupService } from './meetup.service';
import { CreateMeetupDto } from './dto/create-meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import { GetCurrentUser } from 'src/common/decorators';
import { AtGuard } from 'src/common/guards';
import { Roles } from 'src/common/decorators/RoleDecorator';
import { RoleGuard } from 'src/common/guards/role.guard';

@Controller('meetup')
export class MeetupController {
  constructor(private readonly meetupService: MeetupService) {}

  @UseGuards(AtGuard, RoleGuard)
  @Roles("ADMIN")
  @HttpCode(201)
  @Post('create')
  async create(@GetCurrentUser('id') userId, @Body() createMeetupDto: CreateMeetupDto) {
    return this.meetupService.create(createMeetupDto, userId);
  }

  @UseGuards(AtGuard)
  @HttpCode(200)
  @Get('getall')
  async findAll() {
    return this.meetupService.findAll();
  }

  @UseGuards(AtGuard)
  @HttpCode(200)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.meetupService.findOne(id);
  }

  @UseGuards(AtGuard, RoleGuard)
  @Roles("ADMIN")
  @HttpCode(200)
  @Patch(':id')
  async update(@GetCurrentUser('id') userId, @Param('id', ParseIntPipe) id: number, @Body() updateMeetupDto: UpdateMeetupDto) {
    return this.meetupService.update(id, userId, updateMeetupDto);
  }

  @UseGuards(AtGuard, RoleGuard)
  @Roles("ADMIN")
  @HttpCode(200)
  @Delete(':id')
  async remove(@GetCurrentUser('id') userId, @Param('id', ParseIntPipe) id: number) {
    return this.meetupService.remove(id, userId);
  }
}
