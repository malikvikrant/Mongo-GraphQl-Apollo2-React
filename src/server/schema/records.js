import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} from 'graphql';
// import GraphQLDate from 'graphql-date';
import Notes from '../models/notes';
import TaggedNotes from '../models/taggedNotes';

const Tag = new GraphQLObjectType({
  name: 'Tag',
  description: 'Note tag type definition',
  fields: () => ({
    id: { type: GraphQLID },
  }),
});

const Note = new GraphQLObjectType({
  name: 'Note',
  description: 'Note type definition',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    created: { type: GraphQLString },
    notetags: {
      type: new GraphQLList(NoteTag), // eslint-disable-line no-use-before-define
      resolve: async (parent) => {
        const tagsForNote = await new Promise(resolve => resolve(
          TaggedNotes.find({ noteId: parent.id }),
        ));
        return tagsForNote;
      },
    },
  }),
});

const NoteAndTag = new GraphQLObjectType({
  name: 'NoteAndTag',
  description: 'NoteAndTag type definition',
  fields: () => ({
    notes: {
      type: new GraphQLList(Note),
      id: { type: GraphQLID },
      title: { type: GraphQLString },
      description: { type: GraphQLString },
      created: { type: GraphQLString },
      notetags: {
        type: new GraphQLList(NoteTag), // eslint-disable-line no-use-before-define
        resolve: async (parent) => {
          const tagsForNote = await new Promise(resolve => resolve(
            TaggedNotes.find({ noteId: parent.id }),
          ));
          return tagsForNote;
        },
      },
    },
    tags: {
      type: new GraphQLList(Tag),
      resolve: parent => parent.tag,
    },
  }),
});


const NoteTag = new GraphQLObjectType({
  name: 'NoteTag',
  description: 'Note Tag relationship definition',
  fields: () => ({
    tagId: { type: GraphQLString },
    noteId: { type: GraphQLString },
    notes: {
      type: new GraphQLList(Note),
      resolve: async (parent) => {
        const allTaggedNotes = await new Promise(resolve => resolve(
          Notes.find({ _id: parent.noteId }),
        ));
        return allTaggedNotes;
      },
    },
  }),
});

export {
  Note,
  Tag,
  NoteTag,
  NoteAndTag,
};
