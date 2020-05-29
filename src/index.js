const {validate} = require('./validate.js');
const {create} = require('./create.js');

class Schema {
  constructor(schema){
    if (schema === undefined){
      throw TypeError('Schema cannot be undefined.');
    }

    this.schema = schema;
  }

  validate(data){
    return validate(data, this.schema);
  }

  create(data){
    return create(data, this.schema);
  }
}

module.exports = Schema