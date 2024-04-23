export class UseCaseError extends Error {
  code: string;
  data?: string | string[];
  record: any;
  success: boolean;

  constructor(message: string, code: string, data?: any, record?: any) {
    super(message);
    this.code = code;
    this.success = false;
    if (data) {
      this.data = data;
    }
    if (record) {
      this.record = record;
    }
  }
}
