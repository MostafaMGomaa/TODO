const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A Task must have a name'],
      trim: true,
    },
    description: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Tasks = mongoose.model('Tasks', taskSchema);

module.exports = Tasks;
