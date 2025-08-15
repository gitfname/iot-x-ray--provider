import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { RabbitMqService } from './modules/rabbitmq/rabbitmq.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly rabbitMqService: RabbitMqService
  ) { }

  @Get()
  async getHello(): Promise<string> {
    await this.rabbitMqService.sendToQueu("xray_data", { name: "hello world" })
    return this.appService.getHello();
  }
}
