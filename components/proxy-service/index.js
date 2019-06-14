const HttpsProxyAgent = di.resolve('https-proxy-agent');

const proxies = [{
        code: "US",
        host: "http://68.183.188.100:3128"
    },
    {
        code: "BR",
        host: "http://177.101.247.140:3128"
    }
]

const findByCode = (code) => {
    const matched = proxies.find(x => x.code == code);
    if (!matched) {
        console.log(`Proxy with code = ${code} could not be found.`);
    }
    return matched;
}

module.exports = {
    getAll: _ => proxies,

    buildAgentByCode: (code) => {
        const found = findByCode(code);
        if (!found) {
            return null;
        }
        return new HttpsProxyAgent(found.host);
    }
}