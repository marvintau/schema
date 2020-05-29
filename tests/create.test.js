const {create} = require('../src/create');

describe('create', () => {

  test('cons', () => {
    expect(create(123, {cons: 456})).toHaveProperty('data', 456);
  })

  test('from', () => {
    expect(create(123, {from:[123, 456]})).toHaveProperty('data', 123);
  })

  test('primitive', () => {

    expect(create(123, 'number')).toHaveProperty('data', 123);
    expect(create('123', 'string')).toHaveProperty('data', '123');
    expect(create(true, 'boolean')).toHaveProperty('data', true);

    expect(create(undefined, 'number')).toHaveProperty('data', 0);
    expect(create(undefined, 'string')).toHaveProperty('data', '');
    expect(create(undefined, 'boolean')).toHaveProperty('data', false);
  })

  test('list', () => {
    expect(create(['asd'], ['string'])).toHaveProperty('data', ['asd']);
    expect(create(['asd'], ['boolean'])).toHaveProperty('data', ['asd']);

    expect(create(['asd'], [{not:'string'}])).toHaveProperty('data', ['asd']);

    expect(create(undefined, [])).toHaveProperty('data', []);
    expect(create(undefined, {})).toHaveProperty('data', {});
  })

  test('dict', () => {
    expect(create({}, {owl:{cons: 123}})).toHaveProperty(['data', 'owl'], 123);
  })
})