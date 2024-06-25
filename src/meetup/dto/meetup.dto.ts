import { ApiProperty } from "@nestjs/swagger";
import { Tag } from "@prisma/client";

export class MeetupDto {
    @ApiProperty()
    readonly topic: string;

    @ApiProperty()
    readonly description: string;

    @ApiProperty()
    readonly tags: Array<Tag>;

    @ApiProperty()
    readonly eventDateTime: Date;

    @ApiProperty()
    readonly address: string;

    @ApiProperty()
    readonly organizerId: number
}