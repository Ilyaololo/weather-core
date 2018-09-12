import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { FindManyOptions, LessThan, MoreThan } from 'typeorm';

import * as Joi from 'joi';
import { Connection, Pagination } from 'utils';

@Injectable()
export class CursorPipe implements PipeTransform<Pagination, Promise<FindManyOptions>> {
  constructor(
    private readonly key: string,
  ) {
  }

  private static async isGuid(guid): Promise<void> {
    const { error } = Joi.validate(guid, Joi.string().guid({ version: 'uuidv1' }).required());

    if (error) {
      throw new BadRequestException(error);
    }
  }

  public async transform(value: Pagination, metadata: ArgumentMetadata): Promise<FindManyOptions> {
    const options: FindManyOptions = {};

    if (value) {
      if (value.last > 0) {
        options.take = value.last;
        options.order = {
          id: 'DESC',
        };

        if (value.before) {
          const id = Connection.atob(value.before);
          await CursorPipe.isGuid(id);

          options.where = {
            [this.key]: LessThan(id),
          };
        }
      } else if (value.first > 0) {
        options.take = value.first;
        options.order = {
          id: 'ASC',
        };

        if (value.after) {
          const id = Connection.atob(value.after);
          await CursorPipe.isGuid(id);

          options.where = {
            [this.key]: MoreThan(id),
          };
        }
      }
    }

    return options;
  }
}
