import {
  GraphQLList,
  GraphQLString,
  GraphQLID,
} from 'graphql';
import chai from 'chai';
import {   
  Note,
  Tag,
  NoteTag,
  NoteAndTag, 
} from '../../../src/server/schema/records';


const expect = chai.expect;

describe('GraphQL', () => {
  describe('Check Note Object', () => {
    it('Should have an id field of type Id', () => {
      expect(Note.getFields()).to.have.property('id');
      expect(Note.getFields().id.type).to.deep.equals(GraphQLID);
    });
    it('Should have an title field of type String', () => {
      expect(Note.getFields()).to.have.property('title');
      expect(Note.getFields().title.type).to.deep.equals(GraphQLString);
    });
    it('Should have an description field of type String', () => {
      expect(Note.getFields()).to.have.property('description');
      expect(Note.getFields().description.type).to.deep.equals(GraphQLString);
    });
    it('Should have an created field of type String', () => {
      expect(Note.getFields()).to.have.property('created');
      expect(Note.getFields().created.type).to.deep.equals(GraphQLString);
    });
    it('Should have an notetags field of type List', () => {
      expect(Note.getFields()).to.have.property('notetags');
      expect(Note.getFields().notetags.type).to.deep.equals(GraphQLList(NoteTag));
    });
  });
  describe('Check Tag Object', () => {
    it('Should have an id field of type Id', () => {
      expect(Tag.getFields()).to.have.property('id');
      expect(Tag.getFields().id.type).to.deep.equals(GraphQLID);
    });
  });
  describe('Check NoteAndTag Object', () => {
    it('Should have an note field of type list', () => {
      expect(NoteAndTag.getFields()).to.have.property('notes');
      expect(NoteAndTag.getFields().notes.type).to.deep.equals(GraphQLList(Note));
    });
    it('Should have an tagId field of type list', () => {
      expect(NoteAndTag.getFields()).to.have.property('tags');
      expect(NoteAndTag.getFields().tags.type).to.deep.equals(GraphQLList(Tag));
    });
    it('Should resolve tag field', () => {
      expect(NoteAndTag.getFields().tags.resolve({tag: 'test'})).to.equal('test');
    });
  });
  describe('Check NoteTag Object', () => {
    it('Should have an note field of type list', () => {
      expect(NoteAndTag.getFields()).to.have.property('notes');
      expect(NoteAndTag.getFields().notes.type).to.deep.equals(GraphQLList(Note));
    });
    it('Should have an tagId field of type list', () => {
      expect(NoteTag.getFields()).to.have.property('tagId');
      expect(NoteTag.getFields().tagId.type).to.deep.equals(GraphQLString);
    });
    it('Should have an noteId field of type list', () => {
      expect(NoteTag.getFields()).to.have.property('noteId');
      expect(NoteTag.getFields().noteId.type).to.deep.equals(GraphQLString);
    });
  });
});
