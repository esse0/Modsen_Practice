import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  NotContains,
} from 'class-validator';

export class UpdateMeetupDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly topic?: string = undefined;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly description?: string = undefined;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @NotContains(' ', { each: true })
  @ArrayMinSize(0)
  @IsOptional()
  readonly tags?: string[] = undefined;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsDateString()
  @IsOptional()
  readonly eventDateTime?: Date = undefined;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly address?: string = undefined;
}
