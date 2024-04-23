import { Controller } from '@nestjs/common';
import { AntiFraudService } from '../anti-fraud/anti-fraud.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TransactionValidate } from '../../interface';

@Controller()
export class ConsumerController {
  constructor(private readonly antiFraudService: AntiFraudService) {}

  @MessagePattern('transaction-validate-anti-fraud')
  getHello(@Payload() message: TransactionValidate): void {
    console.log('Message received', message);
    this.antiFraudService.validateTransation(message);
  }

  getHellos(): void {
    console.log('Message received');
  }
}
