import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class UserResponseDto{
    @ApiProperty({example:"example@gmail.com"})
    @Expose()
    readonly email: string;
    @ApiProperty({ enum: ['ADMIN', 'USER']})
    @Expose()
    readonly role: string;
}