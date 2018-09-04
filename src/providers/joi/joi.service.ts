import { Inject, BadRequestException } from '@nestjs/common';

import { SchemaLike, ValidationOptions, ValidationResult } from 'joi';

import { JOI, JOI_OPTIONS } from './constants';

export class JoiService {
  constructor(
    @Inject(JOI)
    private readonly joi: any,

    @Inject(JOI_OPTIONS)
    private readonly options: ValidationOptions,
  ) {
  }

  public async validate(value: any, schema: SchemaLike, options: ValidationOptions = {}): Promise<ValidationResult<any>> {
    try {
      return await this.joi.validate(value, schema, {
        ...this.options,
        ...options,
      });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
