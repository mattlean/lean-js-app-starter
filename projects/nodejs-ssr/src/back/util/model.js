// @flow

const model = {
  clearReadOnlyProps(data: Object): Object {
    delete data.createdAt

    return data
  },

  docArrayToJSON(data: Array<Object>): Array<Object> {
    return data.map(d => d.toJSON())
  }
}

export default model
