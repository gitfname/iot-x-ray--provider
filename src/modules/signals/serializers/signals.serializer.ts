import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer"

@Exclude()
export class SignalsSerializer {
    @Expose()
    @ApiProperty()
    _id: string;

    @Expose()
    @ApiProperty()
    deviceId: string;

    @Expose()
    @ApiProperty()
    time: number;

    @Expose()
    @ApiProperty()
    dataLength: number;

    @Expose()
    @ApiProperty()
    dataVolume: number;

    @Expose()
    @ApiProperty()
    rawData: number;

    @Expose()
    @ApiProperty()
    __v: number;
}