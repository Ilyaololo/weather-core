interface WebpackHotModuleReplacement {
  accept: () => any;
  dispose: (cb: () => any) => any;
}

interface WebpackModule {
  hot: WebpackHotModuleReplacement;
}

interface NodeModule extends WebpackModule {}

declare var module: NodeModule;
