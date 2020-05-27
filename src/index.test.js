
const Schema = require('.');

describe('validate', () => {

  test('prim data type', () => {

    const string = new Schema('string')
    const boolean = new Schema('boolean')
    const number = new Schema('number')

    // positive
    expect(string.validate('123')).toEqual({ok:true, type: 'prim'});
    expect(boolean.validate(true)).toEqual({ok:true, type: 'prim'});
    expect(number.validate(123)).toEqual({ok:true, type: 'prim'});

    // negative
    expect(string.validate(123)).toEqual({ok:false, trace:{data: 123, schema:'string'}, type: 'prim'});
  })

  test('dict of prim', () => {

    const schema = new Schema({
      name: 'string',
      age: 'number',
      isDone:'boolean',
    })

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

    const res1 = schema.validate(dataPos);
    const res2 = schema.validate(dataPos2);
    // expect(ok).toBe(fa);
    // expect(res.ok).toBe(false);

    console.log(res1, dataPos, schema, 'yeaha ');
  })

  test('list of prim', () => {
    const schema = new Schema(['number']);

    const res = schema.validate([123, 345]);
    expect(res.ok).toBe(true);
  })

  test ('list of dict', () => {

    const schema = new Schema([{number: 'number'}]);
    const res2 = schema.validate([
      {number: 123},
      {number: 123},
      {hahaha: 123},
      {number: 123},
    ])

    console.log(res2);
    expect(res2.ok).toBe(false);
  })

  test('unexpected', () => {
    expect(() => new Schema()).toThrow('schema cannot be undefined.');
    expect((new Schema(123)).validate(123)).toEqual({ok: false, trace:{data:123, schema:123}, type: 'unknown'});
  })
})

describe('create', () => {

  test('create',() => {
    const schema = new Schema('string');
    const data = '123';
    const res = schema.create(data);
    expect(res).toBe('123');
  })

  test('create complex', () => {
    const schema = new Schema({
      name: 'string'
    })

    const data = {
      name: 'ACCRUAL_ANALYSIS',
      isCascaded: true,
      isHidingManual: true,
      tools: ['ImportExcel', 'SaveRemote', 'ExportExcel'],
      // referredSheetNames: ['BALANCE'],
      colSpecs: {
        ccode_name: {desc: '科目名称', width: 2, isFilterable: true},
        // iyear: {desc:'会计年', width: 1, isFilerable: true},
        // iperiod: {desc:'会计月', width: 1, isFilerable: true},
        // dbill_date: {desc:'记账时间', width: 1, isFilerable: true},
        // voucher_line_num: {desc:'行号', width: 1, isFilerable: true},
        md: {desc: '借方发生', width: 1, isFilterable: true, isSortable: true, cellType:'Number'},
        mc: {desc: '贷方发生', width: 1, isFilterable: true, isSortable: true, cellType:'Number'},
        dest_ccode_name: {desc: '对方科目', width: 2, isFilterable: true},
        descendant_num: {desc: '笔数', width: 1, isSortable: true},
        digest: {desc:'摘要', width: 4, isFilerable: true},
        // dest_ccode: {desc: '对方编码', width: 1, isFilterable: true},
        analyzed: {desc:'已分析', width: 1}  
       }
    }

    expect(schema.create(data)).toEqual({name:'ACCRUAL_ANALYSIS'});
  });

})