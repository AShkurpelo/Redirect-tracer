const http = di.resolve('http');
const router = di.resolve('router');
const endpoints = di.resolve('server-api');

endpoints.forEach(endpoint => {
  router.register(endpoint.path, endpoint.handlerFactory);
});

const server = http.createServer((req, res) => {
  router.handle(req, res);
});

module.exports = {
  run: port => {
    server.listen(port, _ =>
      console.log(`Server started listening to port ${port}`)
    );
  },
  stop: _ => {
    server.close(err => `Error : ${err}`);
  }
};