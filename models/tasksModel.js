const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: [String, require],
  description: [String, require],
});

const Tasks = mongoose.model("Tasks", taskSchema);

module.exports = Tasks;
