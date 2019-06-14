const defaults = di.resolve('defaults');
module.exports = {
    handle: (req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        const message = defaults.getDefaultMessage();
        res.end(message);
    }
}