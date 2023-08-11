const { asClass } = require('awilix');
const fs = require('fs');
const _ = require('lodash');

const initializeRouters = () => {
  const files = fs.readdirSync(__dirname);
  const routers = {};

  files.forEach(file => {
    if (file === 'index.js' || file === 'base') return;

    const router = require(`./${file}`);
    const routerName = _.capitalize(file.split('.')[0])+_.capitalize(file.split('.')[1]);
    routers[routerName] = asClass(router);
  });

  return routers;
};

module.exports = initializeRouters;