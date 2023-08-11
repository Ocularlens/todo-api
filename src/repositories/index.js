const { asClass } = require('awilix');
const fs = require('fs');
const _ = require('lodash');

const initRepository = () => {
  const files = fs.readdirSync(__dirname);
  const repositories = {};

  files.forEach(file => {
    if (file === 'index.js' || file === 'base') return;

    const repo = require(`./${file}`);
    const repoName = _.capitalize(file.split('.')[0])+_.capitalize(file.split('.')[1]);
    repositories[repoName] = asClass(repo);
  });

  return repositories;
};

module.exports = initRepository;
