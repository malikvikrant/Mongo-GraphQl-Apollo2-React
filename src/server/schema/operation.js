import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
} from 'graphql';
import Notes from '../models/notes';
import Tags from '../models/tag';
import TaggedNotes from '../models/taggedNotes';

import {
  Note,
  Tag,
  NoteTag,
  NoteAndTag,
} from './records';

const noteQuery = {
  getNote: {
    type: Note,
    args: { id: { type: GraphQLString } },
    resolve: async (parent, args) => {
      const notes = await new Promise(resolve => resolve(Notes.findById(args.id)));
      return notes;
    },
  },
  getTag: {
    type: Tag,
    args: { id: { type: GraphQLString } },
    resolve: async (parent, args) => {
      const tags = await new Promise(resolve => resolve(Tags.findById(args.id)));
      return tags;
    },
  },
  getAllTags: {
    type: new GraphQLList(Tag),
    resolve: async () => {
      const allTags = await new Promise(resolve => resolve(Tags.find({})));
      return allTags;
    },
  },
  getAllNotesAndTags: {
    type: NoteAndTag,
    resolve: async () => {
      const allNotes = await new Promise(resolve => resolve(Notes.find({})));
      const allTags = await new Promise(resolve => resolve(Tags.find({})));
      return { notes: allNotes, tag: allTags };
    },
  },
  getTaggedNotes: {
    type: new GraphQLList(NoteTag),
    args: { tagId: { type: GraphQLString } },
    resolve: async (parent, args) => {
      const result = await new Promise(resolve => resolve(TaggedNotes.find({ tagId: args.tagId })));
      return result;
    },
  },
};

const noteMutation = {
  addTag: {
    type: Tag,
    args: {
      tagName: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: async (parent, args) => {
      const tag = new Tags({ _id: args.tagName });
      const result = await new Promise(resolve => resolve(tag.save()));
      return result;
    },
  },
  addNote: {
    type: Note,
    args: {
      title: { type: GraphQLString },
      description: { type: GraphQLString },
    },
    resolve: async (parent, args) => {
      const currentDateTime = new Date();
      const note = new Notes({
        title: args.title,
        description: args.description,
        tagName: args.tagName,
        created: currentDateTime,
      });
      const result = await new Promise(resolve => resolve(note.save()));
      return result;
    },
  },
  updateNotes: {
    type: Note,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      description: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, args) => {
      const currentDateTime = new Date();
      const result = await new Promise(resolve => resolve(Notes.findByIdAndUpdate(
        args.id,
        { $set: { description: args.description, created: currentDateTime } },
        { new: true },
      )));
      return result;
    },
  },
  deleteNote: {
    type: Note,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: async (parent, args) => {
      const result = await new Promise(resolve => resolve(Notes.findByIdAndRemove(
        args.id,
      ).exec()));
      return result;
    },
  },
  addTagToNote: {
    type: NoteTag,
    args: {
      tagId: { type: new GraphQLNonNull(GraphQLString) },
      noteId: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, args) => {
      const notesWithTag = new TaggedNotes({
        noteId: args.noteId,
        tagId: args.tagId,
      });
      const result = await new Promise(resolve => resolve(notesWithTag.save()));
      return result;
    },
  },
};

export {
  noteMutation,
  noteQuery,
};
