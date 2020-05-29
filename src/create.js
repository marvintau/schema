const {trav} = require('./trav');

const create = (data, schema) => {

  const createFunc = ({type, data, schema}) => {

    const cons = (_, {cons}) => {
      return {data: cons};
    }

    const from = (data, schema) =>{
      return data !== undefined
      ? {data}
      : {data: schema.from[0]}
    }

    const prim = (data, schema) => {
      const defaultData = {
        number: 0,
        string: '',
        boolean: false
      }[schema];

      return data !== undefined
      ? {data}
      : {data: defaultData}
    }

    const list = (data) => {
      return data === undefined
      ? {data: []}
      : {data: data.map(({data}) => data)}
    }

    const dict = (data) => {
      return data === undefined
      ? {data: {}}
      : typeof data !== 'object' || data.constructor !== Object
      ? {data}
      : {data: Object.fromEntries(Object.entries(data).map(([k, {data}]) => [k, data]))}
    }

    const funcs = {cons, from, prim, list, dict};

    return (type in funcs) ? funcs[type](data, schema) : {};
  }

  return trav(data, schema, createFunc);
}

module.exports = {
  create
}