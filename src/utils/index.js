const { asValue } = require('awilix');
const _ = require('lodash');
const fs = require('fs');

const initUtils = () => {
  const files = fs.readdirSync(__dirname);
  const utils = {};

  files.forEach(file => {
    if (file === 'index.js') return;

    const util = require(`./${file}`);
    const utilName = file.split('.')[0]+_.capitalize(file.split('.')[1]);
    utils[utilName] = asValue(util);
  });

  return utils;
};

module.exports = initUtils;