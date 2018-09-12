import { CacheModule as HttpCacheModule, CacheModuleOptions, DynamicModule, Global, Module } from '@nestjs/common';

@Global()
@Module({})
export class CacheModule {
  public static register(options?: CacheModuleOptions): DynamicModule {
    const provider = HttpCacheModule.register(options);

    return {
      module: CacheModule,
      imports: [provider],
      exports: [provider],
    };
  }
}
