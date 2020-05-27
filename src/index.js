const trav = (data, schema, func) => {
  if (typeof schema === 'string'){

    return func({type: 'prim', data, schema});
  
  } else if (Array.isArray(schema)){

    if (schema.length > 1 || schema.length === 0){
      console.warn(`the Array schema should have length of 1, remaining will be omitted`);
    }

    if (!Array.isArray(data)){
      throw TypeError(`${data} is not array`);
    }

    return data.map((elem) => trav(elem, schema[0], func));

  } else if (schema.constructor === Object) {

    if (data === undefined  || data.constructor !== Object){
      throw TypeError(`the data should be an Object created from Object literal / Object.create() method`);
    }

    const entries = Object.entries(schema)
          .map(([key, value]) => [key, trav(data[key], value, func)]);
    
    return Object.fromEntries(entries);
  }
}


const validate = (data, schema) => {

  if (schema === undefined){
    throw TypeError('You must provide type for validation')
  }

  const trace = {data, schema};

  if (typeof schema === 'string'){

    // for primitive type, if the data is undefined, e.g. the provided
    // data doesn't contain some keys provided by type.

    const type = 'prim';

    const ok = typeof data === schema;
    
    return ok ? { ok, type } : { ok, trace, type};
  
  } else if (Array.isArray(schema) && schema.length === 1){

    const type = 'list';
    
    if (!Array.isArray(data)){

      const ok = false;
      return {ok, trace, type}

    } else {

      const subs = data.map((innerElem) => validate(innerElem, schema[0]));
      const ok = subs.every(({ok}) => ok);
      const trace = subs.filter(({ok}) => !ok);
  
      return ok ? {ok, type} : { ok, trace, type};
    }

  } else if (schema.constructor === Object){

    const type = 'dict';

    if (data === undefined){
      const ok = false;
      const error = 'mismatch';
      return {ok, trace, error, suggest, type};
    }

    const subEntries = Object.entries(schema).map(([k, innerType]) => {
      return [k, validate(data[k], innerType)]
    });
    const ok = subEntries.every(([,{ok}]) => ok);
    const trace = Object.fromEntries(subEntries.filter(([, {ok}]) => !ok));
    
    const error = !ok ? 'inner': 'mismatch';

    return {ok, error, trace, type};
  }

  return {ok: false, trace, type: 'unknown'}
}

class Schema {
  constructor(schema){
    if (schema === undefined){
      throw TypeError('schema cannot be undefined.');
    }

    this.schema = schema;
  }

  validate(data){
    return validate(data, this.schema);
  }

  create(data){
    
    const {ok, trace} = validate(data, this.schema);
    
    if (ok){
      return data;
    } else {
      console.log(trace, 'error');
      throw TypeError(`data does not conform to given schema`)
    }
  }
}

module.exports = Schema;