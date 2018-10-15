import { gql } from 'apollo-boost';

const GET_NOTES_QUERY = gql`{
  getAllNotesAndTags {
    notes {
      id
      title
      description
      created
      notetags {
        tagId
      }
    }
    tags {
      id
    }
  }
}`;

export default GET_NOTES_QUERY;

// export const GET_ALL_TAGS_QUERY = gql`{
//   GetAllTags {
//    id
//   }
// }`;

// export const GET_TAGGED_NOTES_QUERY = gql`{
//   GetTaggedNotes($tagId: String!) {
//     getTaggedNotes(tagId: $tagId!) {
//       tagId
//       noteId
//       notes {
//         id
//         title
//         description
//       }
//     }
//   }
// }`;
