import "dotenv/config"
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('IoT X-Ray Provider')
    .setVersion("0.0.1")
    .build();

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("docs", app, document);

  // check if available env vars is provided or not.
  if (!process.env.RABBITMQ_SERVER_URL) throw new Error("RABBITMQ_SERVER_URL env variable is required")
  if (!process.env.PORT) throw new Error("iot--xray-main-app: PORT is not defined")

  await app.listen(process.env.PORT);
}
bootstrap();
