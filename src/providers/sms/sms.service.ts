import { Inject } from '@nestjs/common';

import { SMS_OPTIONS } from './constants';

export class SmsService {
  constructor(@Inject(SMS_OPTIONS) private readonly options: any) {}
}
