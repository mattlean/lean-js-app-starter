// @flow
const mongoose = require('mongoose')

const schemaType = 'Reply'
const schema = new mongoose.Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now,
      required: true
    },

    comment: {
      type: String,
      required: true
    }
  },
  {
    toObject: {
      transform: (doc, ret) => {
        ret.type = schemaType
        return ret
      }
    }
  }
)

module.exports = schema