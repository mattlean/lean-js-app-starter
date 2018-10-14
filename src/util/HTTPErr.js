// @flow
class HTTPErr extends Error {
  constructor(message: string, res?: any) {
    super(message)

    if(res) this.res = res
  }

  res = undefined
}

export default HTTPErr
