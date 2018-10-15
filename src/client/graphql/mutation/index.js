import { gql } from 'apollo-boost';

export const ADD_NOTE_MUTATION = gql`
  mutation AddNote($title: String!, $description: String!) {
    addNote(title: $title, description: $description) {
    id
  }
}
`;

export const UPDATE_NOTE_MUTATION = gql`
mutation UpdateNotes($id: ID!, $description: String!) {
  updateNotes(id: $id, description: $description) {
  id
  description
}
}
`;

export const DELETE_NOTE_MUTATION = gql`
mutation DeleteNote($id: ID!) {
  deleteNote(id: $id) {
  id
}
}
`;

// export const ADD_TAG = gql`{
//   mutation AddTag($tagName: ID!) {
//     addTag(tagName: $tagName) {
//     id
//   }
//   }
//   `;

// export const ADD_TAG_TO_NOTE = gql`{
//   mutation AddTagToNote($tagId: ID!, $noteId: String!) {
//     addTagToNote(tagId: $tagId, noteId: $noteId) {
//     id
//   }
//   }
//   `;
