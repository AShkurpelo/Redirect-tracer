const path = require("path");
const clearCache = require('./clear-cache');

const container = new Map();
let _rootPath = null;

const register = ({ name, path, factory, value, alwaysNew }) => {
  container.set(name, { path, factory, value, alwaysNew });
};

const registerAll = (items) => {
  items.forEach(item => register(item));
};

const resolve = name => {
  const dep = container.get(name);
  if (!dep) {
    try {
      return require(name);
    } catch (ex) {
      console.error(ex);
    }
    return null;
  }

  if (dep.path) {
    const fullPath = path.join(_rootPath, dep.path);
    const res = require(fullPath);
    if (dep.alwaysNew) {
      clearCache(fullPath);
    }
    return res;
  } else if (dep.factory) {
    if (dep.alwaysNew) {
      return dep.factory();
    }
    dep.value = dep.value ? dep.value : dep.factory();
    return dep.value;
  } else {
    return value;
  }
};

const root = rootPath => {
  _rootPath = rootPath;
};

module.exports = {
  root,
  register,
  registerAll,
  resolve
};