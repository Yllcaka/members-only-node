var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  timestamp: { type: Date, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Message", MessageSchema);
