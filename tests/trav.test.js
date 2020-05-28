const {trav} = require('../src/trav');

describe('trav', () => {

  describe('identical trav', () => {

    const identicalTrav = (data, schema) => {
      const res = trav(data, schema, ({data}) => data)
      return res.data;
    };

    test('positive', () => {  
      expect(identicalTrav(123, 'whatever schema')).toBe(123);
      expect(identicalTrav([], 'whatever schema')).toEqual([]);
      expect(identicalTrav({}, 'whatever schema')).toEqual({});
      expect(identicalTrav({number:'123'}, 'whatever schema')).toEqual({number: '123'});
    })

    test('negative', () => {
      expect(() => identicalTrav(123)).toThrow('Schema should be provided.');
    })
  })

})
