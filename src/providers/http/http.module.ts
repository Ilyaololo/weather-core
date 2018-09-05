import { Global, Module, DynamicModule, HttpModule as AxiosModule } from '@nestjs/common';

import { AxiosRequestConfig } from 'axios';

@Global()
@Module({})
export class HttpModule {
  public static forRoot(options: AxiosRequestConfig = {}): DynamicModule {
    const providers = AxiosModule.register(options);

    return {
      module: HttpModule,
      imports: [ providers ],
      exports: [ providers ],
    };
  }
}
