
describe('validate', () => {

  const {validate} = require('.');

  test('prim data type', () => {

    // positive
    expect(validate('123', 'string')).toEqual({ok:true, trace:{data: '123', type:'string'}, type: 'prim'});
    expect(validate(true, 'boolean')).toEqual({ok:true, trace:{data: true, type:'boolean'}, type: 'prim'});
    expect(validate(123, 'number')).toEqual({ok:true, trace:{data: 123, type:'number'}, type: 'prim'});

    // negative
    expect(validate(123, 'string')).toEqual({ok:false, trace:{data: 123, type:'string'}, error: 'mismatch', type: 'prim'});
  })

  test('dict of prim', () => {

    const schema = {
      name: 'string',
      age: 'number',
      isDone:'boolean',
    }

    const dataPos = {
      name: 'marvin tau',
      age: 34,
      isDone: true
    }

    const dataPos2 = {
      name: "newmin, mai",
      age: 123,
      isDone: 'true'
    }

    const {ok} = validate(dataPos, schema);
    const res = validate(dataPos2, schema);
    expect(ok).toBe(true);
    expect(res.ok).toBe(false);

    console.log(res);
  })

  test('list of prim', () => {
    const schema = ['number'];

    const res = validate([123, 345], schema);
    expect(res.ok).toBe(true);
  })

  test ('list of dict', () => {
    const schema = {
      number: ['number']
    }

    const res = validate({number: [123,345, 3456]}, schema);
    expect(res.ok).toBe(true);

    const schema2 = [{number: 'number'}];
    const res2 = validate([
      {number: 123},
      {number: 123},
      {hahaha: 123},
      {number: 123},
    ],schema2)

    console.log(res2);
    expect(res2.ok).toBe(false);

    const res3 = validate([
      {number: 123},
      {number: 123},
      {number: 123},
      {number: 123},
    ],schema)

    expect(res3.ok).toBe(false);
    // expect(res3.trace.data).toEqual({number: 123})
    // console.log(res3.trace)
  })

  test('unexpected', () => {
    expect(() => validate({})).toThrow('You must provide type for validation');
    expect(validate(123, 123)).toEqual({ok: false, trace:{data:123, type:123}, error:'unsupported', type: 'unknown'});
  })
})