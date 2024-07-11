import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from "class-validator";
import { Order } from "../constants/Order.enum";

export class PageOptionsDto {
  @ApiPropertyOptional({ enum: Order, default: Order.ASC })
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.ASC;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly take?: number = 10;

  @ApiPropertyOptional({
    default: undefined,
  })
  @Type(() => String)
  @IsString()
  @MaxLength(30)
  @IsOptional()
  readonly searchByTopic?: string = undefined;

  @ApiPropertyOptional({
    default: [],
  })
  @Type(() => Array<string>)
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  readonly searchByTags?: string[] = [];

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
