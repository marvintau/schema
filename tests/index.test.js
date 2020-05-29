const Schema = require('../src');
const {create} = require('../src/create');
const {validate} = require('../src/validate');

describe('create schema class', () => {
  test('create schema instance', () => {
    expect(() => new Schema()).toThrow('Schema cannot be undefined.')
  })

  test('create & validate instanace', () => {
    const data = [123, 456];
    const schemaData = ['number'];

    const schema = new Schema(schemaData);

    expect(schema.create(data)).toEqual(create(data, schemaData));
    expect(schema.validate(data)).toEqual(validate(data, schemaData));
  })
})