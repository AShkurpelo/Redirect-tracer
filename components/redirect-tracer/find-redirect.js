const cheerio = di.resolve('cheerio');

const findMetaRedirect = res => {
    let body = '';
    res.on('data', chunk => {
        body += chunk;
    });
    res.on('end', _ => {
        const $ = cheerio.load(body, {
            normalizeWhitespace: true
        });
        const content = $('meta[http-equiv="refresh"]').attr('content');
        return content ? content.slice(content.indexOf('url=') + 4) : null;
    });
}

const findHeaderRefreshRedirect = res => {
    const value = res.headers.refresh;
    if (value) {
        return value.split('url=')[1];
    }
}

const findHeaderLocationRedirect = res => {
    return res.headers.location;
}

const strategies = [findHeaderLocationRedirect, findHeaderRefreshRedirect, findMetaRedirect];

module.exports = res => {
    let found;
    strategies.some(x => found = x(res));
    return found;
}