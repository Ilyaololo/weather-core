import { Inject } from '@nestjs/common';

import { AMQPClient } from 'amqp';

import { AMQP } from './constants';

export class AmqpService {
  constructor(
    @Inject(AMQP)
    private readonly client: AMQPClient,
  ) {
  }
}
