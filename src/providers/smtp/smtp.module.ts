import { DynamicModule, Global, Module } from '@nestjs/common';

import { SmtpService } from './smtp.service';

@Global()
@Module({})
export class SmtpModule {
  public static register(options: any = {}): DynamicModule {
    return {
      module: SmtpModule,
      providers: [
        SmtpService,
        // {
        //   provide: '',
        //   useValue: '',
        // },
      ],
      exports: [SmtpService],
    };
  }
}
