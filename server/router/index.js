const container = di.resolve('router.container');

const handle = (req, res) => {
    let handlerFactory = container.get(req.url);
    if (handlerFactory) {
        handlerFactory().handle(req, res);
    }
}

const register = (path, handlerFactory) => {
    container.add(path, handlerFactory);
}

module.exports = {
    handle,
    register
}