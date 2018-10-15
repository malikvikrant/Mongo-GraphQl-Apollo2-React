import mongoose from 'mongoose';

const { Schema } = mongoose;

const taggedNoteSchema = new Schema({
  tagId: String,
  noteId: String,
});

module.exports = mongoose.model('TaggedNotes', taggedNoteSchema);
