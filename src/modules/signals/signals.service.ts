import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common"
import { RabbitMqService } from "../rabbitmq/rabbitmq.service";
import { SignalsSerializer } from "./serializers";
import { CreateSignalDto, SignalsQueryDto } from "./dto";

@Injectable()
export class SignalsService {

    constructor(
        private readonly rabbitMqService: RabbitMqService
    ) { }

    async create(createSignalDto: CreateSignalDto): Promise<SignalsSerializer> {
        const signal = await this.rabbitMqService.sendMessage<SignalsSerializer>("createSignal", createSignalDto)

        if (signal.success) {
            return signal.data
        }

        throw new InternalServerErrorException()
    }

    async findManySignals(signalsQueryDto: SignalsQueryDto): Promise<SignalsSerializer[]> {
        const { deviceId } = signalsQueryDto

        const signals = await this.rabbitMqService.sendMessage<SignalsSerializer[]>("findManySignals", {
            query: {
                deviceId: deviceId ?? undefined
            }
        })

        if (signals.success) {
            return signals.data
        }

        throw new InternalServerErrorException()
    }

    async findSignalById(id: string): Promise<SignalsSerializer> {
        const signal = await this.rabbitMqService.sendMessage<SignalsSerializer>("findSignalById", { id })

        if (typeof signal.data === "undefined") {
            throw new NotFoundException()
        }

        if (signal.success) {
            return signal.data
        }

        throw new InternalServerErrorException()
    }

}