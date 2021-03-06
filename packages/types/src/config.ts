import { Configuration, Options } from 'webpack'
import * as Config from 'webpack-chain'
import * as webpackDevServer from 'webpack-dev-server'

export interface BuildConfig {
  cwd: string
  isDev: boolean
  publicPath: string
  useHash: boolean,
  host: string
  port: number
  faasPort: number
  chunkName: string
  getOutput: (funcName: string) => {
    clientOutPut: string
    serverOutPut: string
  }
  webpackDevServerConfig: webpackDevServer.Configuration
  loadModule: RequireResolve,
  cssOrder: string[]
  jsOrder: string[]
  staticPrefix: string
  devManifest: any
  chainServerConfig: (config: Config) => Configuration
  chainClientConfig: (config: Config) => Configuration
  webpackStatsOption: Options.Stats
  moduleFileExtensions: string[]
  postCssPlugin: any
  whiteList: RegExp[]
  cloudIDE?: boolean
}

export interface StyleOptions {
  rule: string
  include?: RegExp
  exclude?: RegExp
  modules: boolean,
  loader?: string
  importLoaders: number
}
