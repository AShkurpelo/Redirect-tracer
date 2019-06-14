module.exports = [
    { name: 'config', path: './config' },
    { name: 'server', path: './server' },
    { name: 'router', path: './server/router' },
    { name: 'router.container', path: './server/router/container' },
    { name: 'health', path: './components/health' },
    { name: 'proxy-service', path: './components/proxy-service' },
    { name: 'redirect-tracer', path: './components/redirect-tracer', alwaysNew: true },
    { name: 'find-redirect', path: './components/redirect-tracer/find-redirect' },
    { name: 'defaults', path: './components/defaults' },
    { name: 'server-api', path: './server-api' },
    { name: 'api-handler.health', path: './server-api/handlers/health' },
    { name: 'api-handler.default', path: './server-api/handlers/default' },
    { name: 'api-handler.proxies', path: './server-api/handlers/proxies' },
    { name: 'api-handler.trace', path: './server-api/handlers/trace', alwaysNew: true }
];