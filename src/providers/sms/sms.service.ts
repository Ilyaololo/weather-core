import { Inject } from '@nestjs/common';

import { SMS_OPTIONS_TOKEN } from './constants';

export class SmsService {
  constructor(@Inject(SMS_OPTIONS_TOKEN) private readonly options: any) {
  }
}
