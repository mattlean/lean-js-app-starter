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
      trim: true
    },

    comment: {
      type: String,
      required: true
    },

    replies: [Reply]
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v
        ret._id = ret._id.toString()
        ret.createdAt = ret.createdAt.toJSON()
        ret.type = schemaType
        return ret
      }
    }
  }
)
schema.virtual('type').get(() => schemaType)

module.exports = mongoose.model(schemaType, schema)
