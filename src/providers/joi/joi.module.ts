import { Global, Module, DynamicModule } from '@nestjs/common';

import * as Joi from 'joi';
import { ValidationOptions } from 'joi';

import { JoiService } from './joi.service';
import { JOI, JOI_OPTIONS } from './constants';

@Global()
@Module({})
export class JoiModule {
  public static forRoot(options: ValidationOptions = {}): DynamicModule {
    return {
      module: JoiModule,
      providers: [
        JoiService, {
          provide: JOI,
          useFactory: () => Joi,
        },
        {
          provide: JOI_OPTIONS,
          useValue: options,
        },
      ],
      exports: [ JoiService ],
    };
  }
}
