// @flow

const model = {
  clearReadOnlyProps(data: Object): Object {
    delete data.createdAt

    return data
  },

  docToJSON(data: Object | Array<Object>): Object | Array<Object> {
    if(Array.isArray(data)) {
      return data.map(d => d.toJSON())
    }
    return data.toObject()
  }
}

export default model
