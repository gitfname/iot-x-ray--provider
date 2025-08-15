import "dotenv/config"
import { Module } from "@nestjs/common"
import { ClientsModule, Transport } from "@nestjs/microservices"
import { AmqpConnectionManagerSocketOptions, AmqplibQueueOptions, RmqUrl } from "@nestjs/microservices/external/rmq-url.interface"
import { RabbitMqService } from "./rabbitmq.service"

@Module({
    imports: [
        ClientsModule.register([
            {
                name: "RABBITMQ_SERVICE",
                transport: Transport.RMQ,
                options: {
                    urls: [
                        process.env.RABBITMQ_SERVER_URL!
                    ],
                    queue: "xray_queue",
                    queueOptions: {
                        durable: true
                    } satisfies AmqplibQueueOptions
                }
            }
        ])
    ],
    providers: [RabbitMqService],
    exports: [RabbitMqService]
})
export class RabbitMqModule { }