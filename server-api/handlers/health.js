const health = di.resolve("health");
module.exports.handle = (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    try {
        const status = health.getStatus();
        res.end('Server status : ' + status);
    } catch (e) {
        console.error('Error : ' + e);
        res.statusCode(500);
        res.end('Error : ' + e);
    }
}