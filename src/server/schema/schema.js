
import {
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql';
import { noteQuery, noteMutation } from './operation';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'noteQuery',
    fields: () => ({
      ...noteQuery,
    }),
  }),
  mutation: new GraphQLObjectType({
    name: 'noteMutation',
    fields: () => ({
      ...noteMutation,
    }),
  }),
});
