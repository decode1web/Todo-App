const {Schema, model, Types} = require("mongoose")

const schema = new Schema({
    userId: {type: Types.ObjectId, ref: "User", required: true},
    title: {type: String, required: true},
    description: {type: String},
    status: {type: String, enum: ['open', 'progress', 'done'], default: 'open'},
    createdAt: {type: Date, default: Date.now}
})

module.exports = model("Task", schema)