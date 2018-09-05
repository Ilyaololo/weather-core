import { Inject, BadRequestException } from '@nestjs/common';

import * as Joi from 'joi';

import { JOI, JOI_OPTIONS } from './constants';

export class JoiService {
  constructor(
    @Inject(JOI) private readonly joi: typeof Joi,
    @Inject(JOI_OPTIONS) private readonly options: Joi.ValidationOptions,
  ) {
  }

  public async validate(
    value: any,
    schema: Joi.SchemaLike,
    options: Joi.ValidationOptions = {},
  ): Promise<Joi.ValidationResult<any>> {
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
