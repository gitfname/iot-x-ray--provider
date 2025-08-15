import { Module } from "@nestjs/common"
import { SignalsService } from "./signals.service";
import { SignalsController } from "./signals.controller";
import { RabbitMqModule } from "../rabbitmq/rabbitmq.module";

@Module({
    imports: [
        RabbitMqModule
    ],
    providers: [SignalsService],
    controllers: [SignalsController],
    exports: [SignalsService]
})
export class SignalsModule { }