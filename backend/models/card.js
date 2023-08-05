const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The field "name" must be filled'],
    minlength: [2, 'Minimum field length "name" - 2'],
    maxlength: [30, 'Maximum field length "name" - 30'],
  },
  link: {
    type: String,
    required: [true, 'The "link" field must be filled'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Incorrect URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'The "owner" field must be filled'],
    ref: 'user',
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

module.exports = mongoose.model('card', cardSchema);
