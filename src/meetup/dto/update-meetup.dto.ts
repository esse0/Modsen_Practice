import { ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsDateString, IsNotEmpty, IsOptional, IsString, NotContains } from 'class-validator';


export class UpdateMeetupDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    readonly topic: string;

    @ApiPropertyOptional()
    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @ApiPropertyOptional()
    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    @NotContains(" ", {each: true})
    @ArrayMinSize(0)
    readonly tags: string[];

    @ApiPropertyOptional()
    @IsNotEmpty()
    @IsDateString()
    readonly eventDateTime: Date;

    @ApiPropertyOptional()
    @IsNotEmpty()
    @IsString()
    readonly address: string;
}
