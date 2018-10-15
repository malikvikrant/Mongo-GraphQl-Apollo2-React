import mongoose from 'mongoose';

const { Schema } = mongoose;

const tagSchema = new Schema({
  _id: String,
});

module.exports = mongoose.model('Tags', tagSchema);
