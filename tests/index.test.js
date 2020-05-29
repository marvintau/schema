const Schema = require('.');

describe('create schema class', () => {
  test('create schema instance', () => {
    expect(() => new Schema()).toThrow('Schema cannot be undefined.')
  })
})