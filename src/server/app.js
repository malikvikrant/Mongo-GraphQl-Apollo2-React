import express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';
import cors from 'cors';
import schema from './schema/schema';

const app = express();
app.use(cors());
const PORT = 4000;

mongoose.connect('mongodb://haven:haven123@ds161062.mlab.com:61062/haven_note_app', { useNewUrlParser: true });

mongoose.connection.once('open', () => {
  console.log('connected to database');
});

app.use('/notes', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(PORT, () => {
  console.log(`listening port ${PORT}..`);
});
