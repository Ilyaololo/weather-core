import { ElasticsearchModule, ElasticsearchModuleOptions } from '@nestjs/elasticsearch';
import { Global, Module, DynamicModule } from '@nestjs/common';

@Global()
@Module({})
export class ElasticModule {
  public static forRoot(options: ElasticsearchModuleOptions = {}): DynamicModule {
    const providers = ElasticsearchModule.register(options);

    return {
      module: ElasticModule,
      imports: [ providers ],
      exports: [ providers ],
    };
  }
}
