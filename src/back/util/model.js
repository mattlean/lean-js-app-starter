// @flow

const model = {
  clearReadOnlyProps(data: Object): Object {
    delete data.createdAt

    return data
  },

  docToObject(data: Object | Array<Object>): Object | Array<Object> {
    if(Array.isArray(data)) {
      return data.map(d => d.toObject())
    }
    return data.toObject()
  }
}

export default model
