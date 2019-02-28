// @flow

const model = {
  clearReadOnlyProps(data: Object) {
    delete data.createdAt

    return data
  }
}

module.exports = model
