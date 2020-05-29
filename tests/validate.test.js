
const {validate} = require('../src/validate');

describe('validate', () => {
    
  test('cons', () => {
    expect(validate(123, {cons: 456})).toHaveProperty('ok', true);
  })

  test('from', () => {
    expect(validate(123, {from: [123, 'asd']})).toHaveProperty('ok', true);
    expect(validate('asd', {from: [123, 'asd']})).toHaveProperty('ok', true);
    expect(validate(false, {from: [123, 'asd']})).toHaveProperty('ok', false);
  })

  test('prim', () => {

    expect(validate(123, 'number')).toHaveProperty('ok', true);
    expect(validate('123', 'string')).toHaveProperty('ok', true);

    expect(validate(123, 'string')).toHaveProperty('ok', false);
  })

  test('list', () => {
  
    const data1 = [123, 456];
    expect(validate(data1, ['number'])).toHaveProperty('ok', true);
    expect(validate(data1, ['number', [123, 456, 789]])).toHaveProperty('ok', true);
    expect(validate(data1, ['number', [123, 789]])).toHaveProperty('ok', false);

    const data2 = ['123', '456'];
    expect(validate(data2, ['string'])).toHaveProperty('ok', true);

    const data3 = [{number: 123}, {number: 456}];
    expect(validate(data3, [{number: 'number'}])).toHaveProperty('ok', true);
  })

  test('dict', () => {

    const data = {asd:'hahaha'};
    expect(validate(data, {asd: 'string'})).toHaveProperty('ok', true);
    expect(validate({...data, bsd: 'yo'}, {asd: 'string'})).toHaveProperty('ok', true);

    expect(validate({asd: 'hshha'}, {asd:{cons: 456}})).toHaveProperty('ok', true);

  })

  describe('reality', () => {
    const schema = {
      name: 'string',
      isCascaded: 'boolean',
      isHidingManual: 'boolean',
      tools: ['string', ['SaveRemote', 'ExportExcel']],
      referredSheetNames: ['string', ['BALANCE', 'ACCRUAL_ANALYSIS', 'CASHFLOW_STATEMENT']],
      // specs:{name: 'string'}
    }

    const data = {
      name: 'ACCRUAL_ANALYSIS',
      isCascaded: true,
      isHidingManual: true,
      tools: ['SaveRemote', 'ExportExcel'],
      referredSheetNames: ['BALANCE']
    }

    test('approved', () => {
      
      expect(validate(data, schema)).toHaveProperty('ok', true);

    })

    test('primitive mismatch', () => {
      
      expect(validate({...data, name:123}, schema)).toHaveProperty(['trace', 'name', 'trace', 'data'], 123);
      
      expect(validate({...data, tools:[123]}, schema)).toHaveProperty(['trace', 'tools', 'trace', '0', 'data'], 123)

      expect(validate({...data, tools:['asd']}, schema)).toHaveProperty(['trace', 'tools', 'trace', 'data', '0', 'data'], 'asd')
    })

    test('nested undefined', () => {
      expect(validate(data, {...schema, specs: {name: 'string'}})).toHaveProperty(['trace', 'specs', 'data'], undefined);

      expect(validate(data, {...schema, hey: ['string']})).toHaveProperty(['trace', 'hey', 'data'], undefined);
      // console.log()
    })

    test('invalid schema', () => {
      expect(() => validate(data, {...schema, tools: ['string', 'hahaha']})).toThrow('The second argument of list');
      
      expect(() => validate(data, {...schema, tools: ['asd', 'bsd', 'csd']})).toThrow('invalid schema specification');
    })
  })


})
