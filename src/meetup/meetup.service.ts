import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateMeetupDto } from './dto/create-meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import { DatabaseService } from 'src/database/database.service';
import { PageOptionsDto } from './dto/page-options.dto';
import { PageDto } from './dto/page.dto';
import { MeetupDto } from './dto/meetup.dto';
import { PageMetaDto } from './dto/page-meta.dto';

@Injectable()
export class MeetupService {
  constructor(private readonly prismaService: DatabaseService) {}

  async create(createMeetupDto: CreateMeetupDto, userId: number) {
    const {topic, description, tags, eventDateTime, address} = createMeetupDto;

    let user = await this.prismaService.user.findUnique({where:{id: userId}});

    if(!user) throw new ForbiddenException("User not found");

    return this.prismaService.meetup.create({data:{
      topic,
      description,
      eventDateTime,
      address,
      tags: {
        connectOrCreate: tags.map(tagName => {
          return {
            where:{
              name: tagName
            },
            create:{
              name: tagName
            }
          }
        })
      },
      organizer: {
        connect:{
          id: user.id
        }
      }
    }});
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<MeetupDto>> {

    let meetups = await this.prismaService.meetup.findMany({
      where:{
        topic: pageOptionsDto.searchByTopic
      },
      orderBy: {
        topic: pageOptionsDto.order,
      }, 
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take,
      include:{
        tags: true
      }
    });
    
    const itemCount = meetups.length;

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    
    return new PageDto(meetups, pageMetaDto);
  }

  async findOne(id: number) {
    let meetup = await this.prismaService.meetup.findUnique({where:{ id: id}, include:{tags: true}});

    if(!meetup) throw new BadRequestException("Meetup not found");

    return meetup;
  }

  async update(id: number, userId: number, updateMeetupDto: UpdateMeetupDto) {
    const {topic, description, tags, eventDateTime, address} = updateMeetupDto;

    let user = await this.prismaService.user.findUnique({where:{id: userId}});

    if(!user) throw new ForbiddenException("User not found");

    let meetup = await this.prismaService.meetup.findUnique({where:{ id: id}});

    if(!meetup) throw new BadRequestException("Meetup not found");

    if(meetup.organizerId != user.id) throw new ForbiddenException("Access denied");

    return this.prismaService.meetup.update({where: {id}, data:{
      topic,
      description,
      tags: {
        connectOrCreate: tags.map(tagName => {
          return {
            where:{
              name: tagName
            },
            create:{
              name: tagName
            }
          }
        })
      },
      eventDateTime,
      address
    }});
  }

  async remove(id: number, userId: number) {
    let user = await this.prismaService.user.findUnique({where:{id: userId}});

    if(!user) throw new ForbiddenException("User not found");

    let meetup = await this.prismaService.meetup.findUnique({where:{ id: id}});

    if(!meetup) throw new BadRequestException("Meetup not found");

    if(meetup.organizerId != user.id) throw new ForbiddenException("Access denied");

    return this.prismaService.meetup.delete({where:{id}});
  }
}
