import { DynamicModule, Global, Module } from '@nestjs/common';

import { SMS_OPTIONS_TOKEN } from './constants';
import { SmsService } from './sms.service';

@Global()
@Module({})
export class SmsModule {
  public static register(options: any = {}): DynamicModule {
    return {
      module: SmsModule,
      providers: [
        SmsService,
        {
          provide: SMS_OPTIONS_TOKEN,
          useValue: options,
        },
      ],
      exports: [SmsService],
    };
  }
}
