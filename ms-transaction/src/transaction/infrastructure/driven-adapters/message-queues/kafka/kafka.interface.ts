export interface InfraKafka {
  sendMessage(message: any): Promise<any>;
}
