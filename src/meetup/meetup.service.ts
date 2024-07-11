import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { CreateMeetupDto } from "./dto/create-meetup.dto";
import { UpdateMeetupDto } from "./dto/update-meetup.dto";
import { DatabaseService } from "src/database/database.service";
import { PageOptionsDto } from "./dto/page-options.dto";
import { PageDto } from "./dto/page.dto";
import { PageMetaDto } from "./dto/page-meta.dto";

@Injectable()
export class MeetupService {
  constructor(private readonly prismaService: DatabaseService) {}

  async create(createMeetupDto: CreateMeetupDto, userId: string) {
    const { topic, description, tags, eventDateTime, address } =
      createMeetupDto;

    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new ForbiddenException("User not found");

    return this.prismaService.meetup.create({
      data: {
        topic,
        description,
        eventDateTime,
        address,
        tags: {
          connectOrCreate: tags.map((tagName) => {
            return {
              where: {
                name: tagName,
              },
              create: {
                name: tagName,
              },
            };
          }),
        },
        organizer: {
          connect: {
            id: user.id,
          },
        },
      },
      include: {
        tags: true,
      },
    });
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    const meetupsCount = (
      await this.prismaService.meetup.findMany({
        where: {
          topic: {
            contains: pageOptionsDto.searchByTopic,
          },
          AND: pageOptionsDto.searchByTags.map((tag) => ({
            tags: {
              some: {
                name: tag,
              },
            },
          })),
        },
      })
    ).length;

    const paginatedMeetups = await this.prismaService.meetup.findMany({
      where: {
        topic: {
          contains: pageOptionsDto.searchByTopic,
        },
        AND: pageOptionsDto.searchByTags.map((tag) => ({
          tags: {
            some: {
              name: tag,
            },
          },
        })),
      },
      orderBy: {
        topic: pageOptionsDto.order,
      },
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take,
      include: {
        tags: true,
        subscribers: {
          select: {
            email: true,
          },
        },
      },
    });

    const itemCount = meetupsCount;

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(paginatedMeetups, pageMetaDto);
  }

  async findOne(id: string) {
    const meetup = await this.prismaService.meetup.findUnique({
      where: { id },
      include: {
        tags: true,
        subscribers: {
          select: {
            email: true,
          },
        },
      },
    });

    if (!meetup) throw new BadRequestException("Meetup not found");

    return meetup;
  }

  async update(id: string, userId: string, updateMeetupDto: UpdateMeetupDto) {
    const { topic, description, tags, eventDateTime, address } =
      updateMeetupDto;

    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new ForbiddenException("User not found");

    const meetup = await this.prismaService.meetup.findUnique({
      where: { id },
    });

    if (!meetup) throw new BadRequestException("Meetup not found");

    if (meetup.organizerId != user.id)
      throw new ForbiddenException("Access denied");

    return this.prismaService.meetup.update({
      where: { id },
      data: {
        topic,
        description,
        tags: {
          set: [],
          connectOrCreate: tags?.map((tagName) => {
            return {
              where: {
                name: tagName,
              },
              create: {
                name: tagName,
              },
            };
          }),
        },
        eventDateTime,
        address,
      },
      include: {
        tags: true,
        subscribers: {
          select: {
            email: true,
          },
        },
      },
    });
  }

  async remove(id: string, userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new ForbiddenException("User not found");

    const meetup = await this.prismaService.meetup.findUnique({
      where: { id: id },
    });

    if (!meetup) throw new BadRequestException("Meetup not found");

    if (meetup.organizerId != user.id)
      throw new ForbiddenException("Access denied");

    return this.prismaService.meetup.delete({
      where: { id },
      include: {
        tags: true,
        subscribers: {
          select: {
            email: true,
          },
        },
      },
    });
  }

  async registerUser(id: string, userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      include: { subscribedMeetups: { where: { id } } },
    });

    if (!user) throw new ForbiddenException("User not found");

    if (user.subscribedMeetups.length != 0)
      throw new BadRequestException(
        "You are already registered for the meetup",
      );

    const meetup = await this.prismaService.meetup.findUnique({
      where: { id },
    });

    if (!meetup) throw new BadRequestException("Meetup not found");

    if (meetup.organizerId == userId)
      throw new BadRequestException("Owner cannot register for the meetup");

    return this.prismaService.meetup.update({
      where: { id },
      data: {
        subscribers: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        tags: true,
        subscribers: {
          select: {
            email: true,
          },
        },
      },
    });
  }

  async unregisterUser(id: string, userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      include: { subscribedMeetups: { where: { id: id } } },
    });

    if (!user) throw new ForbiddenException("Meetup not found");

    if (user.subscribedMeetups.length == 0)
      throw new BadRequestException("You are not registered for this meetup");

    return this.prismaService.meetup.update({
      where: { id },
      data: {
        subscribers: {
          disconnect: {
            id: userId,
          },
        },
      },
      include: {
        tags: true,
        subscribers: {
          select: {
            email: true,
          },
        },
      },
    });
  }
}
