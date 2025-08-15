import { Inject, Injectable, OnModuleInit } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"
import { firstValueFrom, timeout } from "rxjs"

@Injectable()
export class RabbitMqService {

    constructor(
        @Inject("RABBITMQ_SERVICE") private readonly client: ClientProxy
    ) { }

    async sendToQueu(pattern: string, data?: any): Promise<{ isSent: boolean }> {
        try {
            await firstValueFrom(this.client.emit(pattern, data).pipe(timeout(10_000)))
            return { isSent: true }
        } catch (error) {
            console.log("error while emiting the event. pattern : ", pattern, "data :", data)
            console.log(error)
            return { isSent: false }
        }
    }

    async sendMessage<T>(pattern: string, payload: any = {}): Promise<{ data: T, success: true } | { data: undefined, success: false }> {
        try {
            const response = await firstValueFrom(this.client.send(pattern, payload).pipe(timeout(5000)))

            return {
                data: response?.data,
                success: true
            }
        } catch (error) {
            return {
                data: undefined,
                success: false
            }
        }
    }

}