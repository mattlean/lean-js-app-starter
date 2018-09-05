// @flow

const mongoose = require('mongoose')

const schemaType = 'Thread'
const schema = new mongoose.Schema(
  {
    _id: {
      type: Number,
      required: true
    },

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
    }
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
