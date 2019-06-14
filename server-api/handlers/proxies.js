const proxyService = di.resolve('proxy-service');
const getResponseMsg = _ => {
    const proxies = proxyService.getAll();
    let msg =
        "Available proxies: \n" +
        proxies.map(x => `\t${x.code} - ${x.host}`).join("\n");
    return msg;
};
module.exports.handle = (req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    try {
        const msg = getResponseMsg();
        res.end(msg);
    } catch (e) {
        const msg = `Error : ${e}'\n`;
        console.log(msg);
        res.statusCode = 500;
        res.end(msg);
    }
}