import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query } from "@nestjs/common"
import { ApiOkResponse, ApiParam, ApiTags } from "@nestjs/swagger";
import { SignalsService } from "./signals.service";
import { SignalsSerializer } from "./serializers";
import { plainToInstance } from "class-transformer";
import { CreateSignalDto, SignalsQueryDto } from "./dto";

@Controller("signals")
@ApiTags("Signals")
export class SignalsController {

    constructor(
        private readonly signalsService: SignalsService
    ) { }


    @Post()
    async createSignal(@Body() createSignalDto: CreateSignalDto): Promise<SignalsSerializer> {
        return plainToInstance(
            SignalsSerializer,
            await this.signalsService.create(createSignalDto)
        )
    }

    @Get()
    @ApiOkResponse({ type: [SignalsSerializer] })
    async findManySignals(
        @Query() signalsQueryDto: SignalsQueryDto
    ): Promise<SignalsSerializer[]> {
        return plainToInstance(
            SignalsSerializer,
            await this.signalsService.findManySignals(signalsQueryDto)
        )
    }

    @Get(":id")
    @ApiOkResponse({ type: SignalsSerializer })
    @ApiParam({ name: "id", type: String })
    async findSignalById(@Param("id") id: string): Promise<SignalsSerializer> {
        return plainToInstance(
            SignalsSerializer,
            await this.signalsService.findSignalById(id)
        )
    }

}