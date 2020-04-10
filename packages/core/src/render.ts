import { getCwd, findRoute, parseYml, parseRoutesFromYml } from 'ssr-server-utils'
import { IFaaSContext, FaasRouteItem }from 'ssr-types'

const ymlContent = parseYml('./f.yml')
const faasRoutes = parseRoutesFromYml(ymlContent)

const render = async (ctx: IFaaSContext) => {
  const cwd = getCwd()
  const isLocal = process.env.NODE_ENV === 'development' || ctx.env === 'local' // 标志非正式环境

  // for this issue https://github.com/ykfe/egg-react-ssr/issues/4
  const renderToString = require(cwd + '/node_modules/react-dom/server').renderToString
  const faasRouteItem = findRoute<FaasRouteItem>(faasRoutes, ctx.req.path)
  const { funcName } = faasRouteItem
  const abFilePath = `${cwd}/build/${funcName}/server/Page.server.js`

  if (isLocal) {
    // clear cache in development environment
    delete require.cache[abFilePath]
  }

  const serverRender = require(abFilePath).default
  const serverRes = await serverRender(ctx, {
    faasRoutes: faasRoutes
  })

  const htmlStr = renderToString(serverRes)
  return htmlStr
}

export {
  render
}