import { IsNotEmpty, IsString, IsArray, ArrayMinSize, IsDateString, NotContains } from "class-validator";

export class CreateMeetupDto {
    @IsNotEmpty()
    @IsString()
    topic: String;

    @IsNotEmpty()
    @IsString()
    description: String;

    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    @NotContains(" ", {each: true})
    @ArrayMinSize(0)
    tags: String[];

    @IsNotEmpty()
    @IsDateString()
    eventDateTime: Date;

    @IsNotEmpty()
    @IsString()
    address: String;
}
