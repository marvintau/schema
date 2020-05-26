const validate = (data, schema) => {

  if (schema === undefined){
    throw TypeError('You must provide type for validation')
  }

  const trace = {data, schema};

  if (typeof type === 'string'){

    // for primitive type, if the data is undefined, e.g. the provided
    // data doesn't contain some keys provided by type.

    const type = 'prim';

    const ok = typeof data === schema;
    const error = data === undefined 
    ? 'undefined' 
    : !ok 
    ? 'mismatch' 
    : undefined;
    
    const suggest = {
      string: '',
      number: 0,
      boolean: false,
    }[schema]

    return ok
      ? { ok, type }
      : { ok, error, trace, suggest, type};
  
  } else if (Array.isArray(schema) && schema.length === 1){

    const type = 'list';
    
    if (!Array.isArray(data)){
      const ok = false;
      const suggest = [];

      return data === undefined
      ? {ok, error: 'undefined', suggest, trace, type}
      : {ok, error: 'mismatch', trace, type}
    }

    const subs = data.map((innerElem) => validate(innerElem, schema[0]));
    const ok = subs.every(({ok}) => ok);
    const trace = subs.filter(({ok}) => !ok);

    const error = !ok ? 'inner' : 'mismatch';

    return { ok, trace, error, type}

  } else if (schema.constructor === Object){

    const type = 'dict';

    if (data === undefined){
      const ok = false;
      const error = 'mismatch';
      const suggest = {};
      return {ok, trace, error, suggest, type};
    }

    const subEntries = Object.entries(type).map(([k, innerType]) => {
      return [k, validate(data[k], innerType)]
    });
    const ok = subEntries.every(([,{ok}]) => ok);
    const trace = Object.fromEntries(subEntries.filter(([, {ok}]) => !ok));
    
    const error = !ok ? 'inner': 'mismatch';

    return {ok, error, trace, type};
  }

  return {ok: false, error:'unsupported', trace: {data, schema}, type: 'unknown'}
}

const create = (data, schema) => {
  const {ok, error} = validate(data, schema);
  if (ok){
    return data;
  } else if (error === 'undefined') {
  } else {
    throw TypeError(`data does not conform to given schema`)
  }
}

module.exports = {
  validate
}