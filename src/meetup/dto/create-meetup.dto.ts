import { IsNotEmpty, IsString, IsArray, ArrayMinSize, IsDateString, NotContains } from "class-validator";

export class CreateMeetupDto {
    @IsNotEmpty()
    @IsString()
    topic: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    @NotContains(" ", {each: true})
    @ArrayMinSize(0)
    tags: string[];

    @IsNotEmpty()
    @IsDateString()
    eventDateTime: Date;

    @IsNotEmpty()
    @IsString()
    address: string;
}
