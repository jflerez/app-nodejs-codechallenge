import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { EnvironmentConfigService } from './transaction/infrastructure/config/environment-config/environment-config.service';
import { Partitioners } from 'kafkajs';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(EnvironmentConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [configService.getBrokerKafka()],
        connectionTimeout: 20000,
        retry: {
          initialRetryTime: 20000,
          retries: 10,
        },
      },
      consumer: {
        groupId: 'anti-fraud-consumer',
      },
      producer: {
        createPartitioner: Partitioners.LegacyPartitioner,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(configService.getAppPort(), () =>
    console.log(`app listen at port: ${configService.getAppPort()}`),
  );
}

bootstrap();
