import { IsNotEmpty, IsString, IsArray, ArrayMinSize, IsDateString, NotContains } from "class-validator";

export class CreateMeetupDto {
    @IsNotEmpty()
    @IsString()
    readonly topic: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    @NotContains(" ", {each: true})
    @ArrayMinSize(0)
    readonly tags: string[];

    @IsNotEmpty()
    @IsDateString()
    readonly eventDateTime: Date;

    @IsNotEmpty()
    @IsString()
    readonly address: string;
}
