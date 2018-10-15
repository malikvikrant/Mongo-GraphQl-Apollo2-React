import React from 'react';
import { Mutation } from 'react-apollo';
import { Button } from 'reactstrap';
import { ADD_NOTE_MUTATION } from '../../graphql/mutation';
import GET_NOTES_QUERY from '../../graphql/queries';
import './note-header.css';
import * as Constants from '../../utils/constants';

const NoteHeader = () => (
  <div className="note-header">
    <div className="note-header-label">
      { Constants.HAVEN_NOTEPAD }
    </div>
    <div className="add-note-info-update">
      <Mutation
        mutation={ADD_NOTE_MUTATION}
        variables={{ title: '', description: '' }}
        refetchQueries={[{ query: GET_NOTES_QUERY }]}
      >
        {postMutation => <Button onClick={postMutation}>Create</Button>}
      </Mutation>
    </div>
  </div>
);

export default NoteHeader;
