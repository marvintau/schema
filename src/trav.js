const trav = (data, schema, func) => {

  if(schema === undefined){
    throw TypeError('Schema should be provided.');
  }

  if (schema.cons !== undefined){

    return {data, ...func({type:'cons', data, schema})};

  } else if (schema.from && Array.isArray(schema.from)){

    return {data, ...func({type:'from', data, schema})};

  } else if (typeof schema === 'string'){

    return {data, ...func({type:'prim', data, schema})};
  
  } else if (Array.isArray(schema)){

    let type = 'list';

    if (!Array.isArray(data)){
      return func({type, data, schema});
    }

    const elems = data.map((elem) => trav(elem, schema[0], func));
    
    return {data, ...func({ type, data: elems, schema })};

  } else if (schema.constructor === Object) {

    const type = 'dict'

    if (data === undefined  || data.constructor !== Object){
      // throw TypeError(`the data should be an Object created from Object literal / Object.create() method`);
      return func({type, data, schema});
    }

    const entries = Object.entries(schema)
          .map(([key, value]) => [key, trav(data[key], value, func)]);
    
    const res = func({type, data: Object.fromEntries(entries), schema});

    return {data, ...res};
  }
}

module.exports = {
  trav
}