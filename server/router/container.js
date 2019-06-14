const items = [];
const add = (path, value) => {
    const item = {
        path,
        value
    };
    items.push(item);
}
const get = url => {
    const item = items.find(x => url.indexOf(x.path) > -1);
    return item ? item.value : null;
}

module.exports = {
    add,
    get
};