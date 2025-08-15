import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, IsInt } from "class-validator"

export class CreateSignalDto {
    @IsString()
    @MaxLength(255)
    @ApiProperty()
    deviceId: string;

    @IsInt()
    @ApiProperty()
    time: number;

    @IsInt()
    @ApiProperty()
    dataLength: number;

    @IsInt()
    @ApiProperty()
    dataVolume: number;
}