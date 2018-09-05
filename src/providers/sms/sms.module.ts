import { DynamicModule, Global, Module } from '@nestjs/common';

import { SMS_OPTIONS } from './constants';
import { SmsService } from './sms.service';

@Global()
@Module({})
export class SmsModule {
  public static forRoot(options: any = {}): DynamicModule {
    return {
      module: SmsModule,
      providers: [
        SmsService,
        {
          provide: SMS_OPTIONS,
          useValue: options,
        },
      ],
      exports: [ SmsService ],
    };
  }
}
