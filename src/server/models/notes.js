import mongoose from 'mongoose';

const { Schema } = mongoose;

const notesSchema = new Schema({
  title: String,
  description: String,
  created: String,
});

module.exports = mongoose.model('Notes', notesSchema);
