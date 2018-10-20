// @flow
import mongoose from 'mongoose'

import Reply from './reply'

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
    toObject: {
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

export default mongoose.model(schemaType, schema)
