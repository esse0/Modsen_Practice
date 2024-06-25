import { ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsDateString, IsNotEmpty, IsOptional, IsString, NotContains } from 'class-validator';


export class UpdateMeetupDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly topic?: string;

    @ApiPropertyOptional()
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly description?: string;

    @ApiPropertyOptional()
    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    @NotContains(" ", {each: true})
    @ArrayMinSize(0)
    @IsOptional()
    readonly tags?: string[];

    @ApiPropertyOptional()
    @IsNotEmpty()
    @IsDateString()
    @IsOptional()
    readonly eventDateTime?: Date;

    @ApiPropertyOptional()
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly address?: string;
}
