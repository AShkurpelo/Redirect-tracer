const di = require('./di');
const deps = require('./di-config');

global.di = di;
di.root(__dirname);
di.registerAll(deps);

const server = di.resolve('server');
const { port } = di.resolve('config');

server.run(port);