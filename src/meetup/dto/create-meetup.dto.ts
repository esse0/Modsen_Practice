import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayMinSize,
  IsDateString,
  NotContains,
} from 'class-validator';

export class CreateMeetupDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly topic: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @NotContains(' ', { each: true })
  @ArrayMinSize(0)
  readonly tags: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  readonly eventDateTime: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly address: string;
}
