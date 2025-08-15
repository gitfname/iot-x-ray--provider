import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumberString, IsOptional, MaxLength } from "class-validator"

export class SignalsQueryDto {
    @IsOptional()
    @IsNumberString()
    @MaxLength(12)
    @ApiPropertyOptional()
    deviceId: string;
}