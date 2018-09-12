import { Inject } from '@nestjs/common';

import { AMQPClient } from 'amqp';

import { AMQP_TOKEN } from './constants';

export class AmqpService {
  constructor(
    @Inject(AMQP_TOKEN)
    private readonly client: AMQPClient,
  ) {
  }
}
