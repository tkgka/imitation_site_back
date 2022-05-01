import { Injectable } from '@nestjs/common';
import Axios from 'axios';
import reg_pattern from './reg_pattern';

@Injectable()
export class AppService {
  async returnBuffer(URL: string) {
    URL.match(reg_pattern.pattern) ? (URL = URL) : (URL = `https://${URL}`);
    return await Axios({
      url: URL,
      method: 'GET',
      responseType: 'arraybuffer',
    });
  }

  getHello(): string {
    return 'Hello';
  }
}
