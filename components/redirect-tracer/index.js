const http = di.resolve('http');
const https = di.resolve('https');
const findRedirect = di.resolve('find-redirect');

let maxRedirectsCount = 30;
let requestOptions;
let writer;
const history = [];

const getProtocolImpl = urlStr => {
    return urlStr.startsWith('https') ? https : http;
}

const request = urlStr => {
    if (history.some(x => x === urlStr)) {
        return onMessage("Error : Redirect loop");
    }
    history.push(urlStr);
    if (history.length > maxRedirectsCount) {
        return onMessage(`Error : Max redirects count riched (${maxRedirectsCount})`);
    }
    onMessage(`\n\nRequesting ${urlStr}\n`);
    const protocolImpl = getProtocolImpl(urlStr);
    protocolImpl.get(urlStr, requestOptions, handleResponse);
}

const onMessage = msg => {
    console.log(msg);
    writer.write(msg);
}

const handleResponse = res => {
    writeResponceInfo(res);
    const redirectUrl = findRedirect(res);
    if (!redirectUrl) {
        writer.end();
        return;
    }
    const nextUrl = redirectUrl.startsWith('http') ? redirectUrl : new URL(redirectUrl, history[history.length - 1]).href;
    request(nextUrl);
}

const writeResponceInfo = res => {
    let info = `\n\tStatus : ${res.statusCode} ${res.statusMessage}` +
        `\n\tHeaders : ${Object.keys(res.headers).reduce((str, key) => `${str}\n\t\t${key}: ${res.headers[key]}`)}` +
        (res.cookie ? `\n\tCookie : ${res.cookie}\n` : '\n');
    onMessage(info);
}

module.exports.process = options => {
    requestOptions = {
        agent: options.agent ? options.agent : undefined
    };
    writer = options.writer;
    maxRedirectsCount = options.maxRedirectsCount || maxRedirectsCount;

    try {
        request(options.url);
    } catch (ex) {
        onMessage(ex);
    }
}