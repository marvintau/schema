const {trav} = require('./trav');

const validate = (data, schema) => {

  const validFunc = ({type, data, schema}) => {

    const cons = () => {
      return {ok: true};
    }

    const from = (data, schema) => {
      if (schema.from.length === 0){
        throw TypeError('the enumerate options should contain at least one element');
      }
      
      const trace = {data, schema};
      const ok = schema.from.includes(data);
      return ok ? {ok} : {ok, trace};
    }

    const prim = (data, schema) => {

      let ok;
      if (schema === 'integer') {
        ok = Number.isInteger(data);
      } else {
        ok = typeof data === schema;
      }

      const trace = {data, schema};

      return ok ? {ok} : {ok, trace};
    }

    const list = (data, schema) => {

      if (![1,2].includes(schema.length)){
        throw TypeError('invalid schema specification');
      }

      if (data === undefined){
        return {ok: false, trace: {data, schema}};
      }

      const entries = data.map((e, i) => [i, e]);
      const subTypeOK = entries.every(([_, {ok}]) => ok);
      const res = entries.find(([, {ok}]) => !ok);

      let includedOK = true;
      if (schema.length === 2 ){
        if (!Array.isArray(schema[1]) || schema[1].length === 0){
          throw TypeError('The second argument of list schema must be an non-empty array')
        }

        includedOK = data.every(({data}) => schema[1].includes(data));
        // console.log('included ok', includedOK)
      }
      let ok = subTypeOK && includedOK;
  
      if (ok) {
        return {ok};
      } else if (!subTypeOK) {
        const [index, trace] = res;
        return {ok, trace:{[index]: trace}};
      } else {
        return {ok, trace:{data, schema}};
      }
    }

    const dict = (data) => {

      if (data === undefined){
        return {ok: false, trace: {data, schema}}
      }

      const entries = Object.entries(data);
      const ok = entries.every(([, {ok}]) => ok);
      const res = entries.find(([, {ok}]) => !ok);

      if (ok){
        return {ok};
      } else {
        const [key, trace] = res;
        return {ok, trace:{[key]: trace}};
      }
    }

    const funcs = { cons, from, prim, list, dict }

    return (type in funcs) ? funcs[type](data, schema) : {ok: false};
  }

  return trav(data, schema, validFunc);
}

module.exports = {
  validate
}