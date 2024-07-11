import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  Query,
  ParseUUIDPipe,
} from "@nestjs/common";
import { MeetupService } from "./meetup.service";
import { CreateMeetupDto } from "./dto/create-meetup.dto";
import { UpdateMeetupDto } from "./dto/update-meetup.dto";
import { GetCurrentUser } from "src/common/decorators";
import { AtGuard } from "src/common/guards";
import { Roles } from "src/common/decorators/RoleDecorator";
import { RoleGuard } from "src/common/guards/role.guard";
import {
  ApiResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiSecurity,
  ApiTags,
  ApiForbiddenResponse,
  ApiCreatedResponse,
} from "@nestjs/swagger";
import { PageOptionsDto } from "./dto/page-options.dto";
import { CustomResponseDto } from "src/common/dto/custom-response.dto";

@ApiTags("meetups")
@Controller("meetups")
@UseGuards(AtGuard, RoleGuard)
export class MeetupController {
  constructor(private readonly meetupService: MeetupService) {}

  @ApiCreatedResponse({
    description: "Successful response",
    type: CustomResponseDto,
  })
  @ApiForbiddenResponse({
    description: "Access denied",
    type: CustomResponseDto,
  })
  @ApiBadRequestResponse({
    description: "Bad request",
    type: CustomResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
    type: CustomResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: "Unathorized",
    type: CustomResponseDto,
  })
  @ApiSecurity("access-token")
  @Roles("ADMIN")
  @HttpCode(201)
  @Post()
  @ApiResponse({ status: 201, type: CreateMeetupDto })
  async create(
    @GetCurrentUser("id") userId: string,
    @Body() createMeetupDto: CreateMeetupDto,
  ) {
    return this.meetupService.create(createMeetupDto, userId);
  }

  @ApiOkResponse({
    description: "Successful response",
    type: CustomResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
    type: CustomResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: "Unathorized",
    type: CustomResponseDto,
  })
  @ApiSecurity("access-token")
  @Roles("ADMIN", "USER")
  @HttpCode(200)
  @Get()
  async findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.meetupService.findAll(pageOptionsDto);
  }

  @ApiOkResponse({
    description: "Successful response",
    type: CustomResponseDto,
  })
  @ApiBadRequestResponse({
    description: "Bad request",
    type: CustomResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
    type: CustomResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: "Unathorized",
    type: CustomResponseDto,
  })
  @ApiSecurity("access-token")
  @Roles("ADMIN", "USER")
  @HttpCode(200)
  @Get(":id")
  async findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.meetupService.findOne(id);
  }

  @ApiOkResponse({
    description: "Successful response",
    type: CustomResponseDto,
  })
  @ApiForbiddenResponse({
    description: "Access denied",
    type: CustomResponseDto,
  })
  @ApiBadRequestResponse({
    description: "Bad request",
    type: CustomResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
    type: CustomResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: "Unathorized",
    type: CustomResponseDto,
  })
  @ApiSecurity("access-token")
  @Roles("ADMIN")
  @HttpCode(200)
  @Patch(":id")
  async update(
    @GetCurrentUser("id") userId: string,
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateMeetupDto: UpdateMeetupDto,
  ) {
    return this.meetupService.update(id, userId, updateMeetupDto);
  }

  @ApiOkResponse({
    description: "Successful response",
    type: CustomResponseDto,
  })
  @ApiForbiddenResponse({
    description: "Access denied",
    type: CustomResponseDto,
  })
  @ApiBadRequestResponse({
    description: "Bad request",
    type: CustomResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
    type: CustomResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: "Unathorized",
    type: CustomResponseDto,
  })
  @ApiSecurity("access-token")
  @Roles("ADMIN")
  @HttpCode(200)
  @Delete(":id")
  async remove(
    @GetCurrentUser("id") userId: string,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.meetupService.remove(id, userId);
  }

  @ApiOkResponse({
    description: "Successful response",
    type: CustomResponseDto,
  })
  @ApiForbiddenResponse({
    description: "User not found",
    type: CustomResponseDto,
  })
  @ApiBadRequestResponse({
    description: "Bad request",
    type: CustomResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
    type: CustomResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: "Unathorized",
    type: CustomResponseDto,
  })
  @ApiSecurity("access-token")
  @Roles("ADMIN", "USER")
  @HttpCode(200)
  @Post(":id/register")
  async registerUser(
    @GetCurrentUser("id") userId: string,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.meetupService.registerUser(id, userId);
  }

  @ApiOkResponse({
    description: "Successful response",
    type: CustomResponseDto,
  })
  @ApiForbiddenResponse({
    description: "User not found",
    type: CustomResponseDto,
  })
  @ApiBadRequestResponse({
    description: "Meetup not found",
    type: CustomResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
    type: CustomResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: "Unathorized",
    type: CustomResponseDto,
  })
  @ApiSecurity("access-token")
  @Roles("ADMIN", "USER")
  @HttpCode(200)
  @Post(":id/unregister")
  async unregisterUser(
    @GetCurrentUser("id") userId: string,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.meetupService.unregisterUser(id, userId);
  }
}
