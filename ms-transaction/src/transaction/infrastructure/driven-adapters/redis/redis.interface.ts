export interface InfraRedis {
  get(key: string): Promise<any>;
  set(key: string, value): Promise<any>;
}
