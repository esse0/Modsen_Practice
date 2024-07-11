import { ApiProperty } from "@nestjs/swagger";

export class CustomResponseDto {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string | null;

  @ApiProperty({ example: "/api/example" })
  path: string;

  @ApiProperty()
  data: any;
}
