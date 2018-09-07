// @flow

const mongoose = require('mongoose')

const Reply = require('./reply')

const schemaType = 'Thread'
const schema = new mongoose.Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now,
      required: true
    },

    subject: {
      type: String,
      trim: true,
      required: true
    },

    comment: {
      type: String,
      required: true
    },

    replies: [Reply]
  },
  {
    toObject: {
      transform: (doc, ret) => {
        delete ret.__v
        ret.type = schemaType
        return ret
      }
    }
  }
)

module.exports = mongoose.model(schemaType, schema)
