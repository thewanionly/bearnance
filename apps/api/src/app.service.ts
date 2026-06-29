import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getApiInfo() {
    return {
      name: 'Bearnance API',
      version: '0.1.0',
    };
  }
}
