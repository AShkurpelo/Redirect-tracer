const health = _ => di.resolve('api-handler.health');
const default_ = _ => di.resolve('api-handler.default');
const proxies = _ => di.resolve('api-handler.proxies');
const trace = _ => di.resolve('api-handler.trace');

module.exports = [
    { path: '/health', handlerFactory: health },
    { path: '/proxies', handlerFactory: proxies },
    { path: '/trace', handlerFactory: trace },
    { path: '/', handlerFactory: default_ }
]