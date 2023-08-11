const { asValue } = require('awilix');
const _ = require('lodash');
const fs = require('fs');

const initializedSchemas = () => {
  const files = fs.readdirSync(__dirname);
  const schemas = {};

  files.forEach(file => {
    if (file === 'index.js') return;

    const schema = require(`./${file}`);
    const schemaName = file.split('.')[0]+_.capitalize(file.split('.')[1]);
    schemas[schemaName] = asValue(schema);
  });

  return schemas;
};

module.exports = initializedSchemas;