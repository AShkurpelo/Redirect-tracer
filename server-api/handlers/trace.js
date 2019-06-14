const tracer = di.resolve('redirect-tracer');
const urlLib = di.resolve('url');
const proxyService = di.resolve('proxy-service');

const urlRegEx = /(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,63}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?/;

const parseRequestUrl = requestUrl => {
    const { url, proxy } = urlLib.parse(requestUrl, true).query;

    if (!urlRegEx.test(url)) {
        const message = `Wrong url : ${url}`;
        console.log(message);
        return { success: false, result: message };
    }

    let agent = null;
    if (proxy) {
        agent = proxyService.buildAgentByCode(proxy);
        if (!agent) {
            return { success: false, result: `Can't resolve proxy with code = ${proxy}` };
        }
    }

    return { success: true, result: { url, agent } };
}

module.exports.handle = (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    const input = parseRequestUrl(req.url);
    if (!input.success) {
        console.log(input.result);
        res.statusCode = 400;
        res.end(input.result);
    }
    input.result.writer = res;
    tracer.process(input.result);
}