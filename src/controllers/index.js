const { asClass } = require('awilix');
const _ = require('lodash');
const fs = require('fs');

const initControllers = () => {
  const files = fs.readdirSync(__dirname);
  const controllers = {};

  files.forEach(file => {
    if (file === 'index.js') return;

    const controller = require(`./${file}`);
    const controllerName = _.capitalize(file.split('.')[0])+_.capitalize(file.split('.')[1]);
    controllers[controllerName] = asClass(controller);
  });

  return controllers;
};

module.exports = initControllers;
