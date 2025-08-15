import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitMqModule } from './modules/rabbitmq/rabbitmq.module';
import { SignalsModule } from './modules/signals/signals.module';

@Module({
  imports: [
    RabbitMqModule,
    SignalsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
