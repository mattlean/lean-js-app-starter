// @flow

const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  },

  comment: {
    type: String,
    required: true
  }
})

module.exports = schema