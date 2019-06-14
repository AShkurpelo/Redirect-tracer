const clearCache = moduleName => {
    searchCache(moduleName, mod => {
        delete require.cache[mod.id];
    });

    Object.keys(module.constructor._pathCache).forEach(cacheKey => {
        if (cacheKey.indexOf(moduleName)>0) {
            delete module.constructor._pathCache[cacheKey];
        }
    });
};

const searchCache = (moduleName, callback) => {
    var mod = require.resolve(moduleName);

    if (mod && ((mod = require.cache[mod]) !== undefined)) {
        (function traverse(mod) {
            mod.children.forEach(child => {
                if (child.parent.id == mod.id) {
                    traverse(child);
                }
            });

            callback(mod);
        }(mod));
    }
};

module.exports = clearCache;