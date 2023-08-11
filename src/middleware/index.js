const { asClass } = require('awilix');
const _ = require('lodash');
const fs = require('fs');

const initMiddleware = () => {
  const files = fs.readdirSync(__dirname);
  const middlewares = {};

  files.forEach(file => {
    if (file === 'index.js') return;

    const middleware = require(`./${file}`);
    const middlewareName = _.capitalize(file.split('.')[0])+_.capitalize(file.split('.')[1]);
    middlewares[middlewareName] = asClass(middleware);
  });

  return middlewares;
};

module.exports = initMiddleware;
