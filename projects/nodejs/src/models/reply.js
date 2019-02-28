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
    toJSON: {
      transform: (doc, ret) => {
        ret._id = ret._id.toString()
        ret.createdAt = ret.createdAt.toJSON()
        ret.type = schemaType
        return ret
      }
    }
  }
)
schema.virtual('type').get(() => schemaType)

module.exports = schema
