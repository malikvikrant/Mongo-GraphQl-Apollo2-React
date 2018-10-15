import React from 'react';
import { Query } from 'react-apollo';
import {
  Container,
  Row,
  Col,
  Label,
} from 'reactstrap';
// components
import NoteList from './NoteList/NoteList';
import NoteHeader from './NoteHeader/NoteHeader';
import GET_NOTES_QUERY from '../graphql/queries';
import sortNoteObject from '../utils/note-helper';
import './app.css';

const App = () => (
  <Query asyncMode query={GET_NOTES_QUERY}>
    {({ loading, error, data }) => {
      if (loading) return <div>Fetching</div>;
      if (error) return <div>Error</div>;
      const allNotes = sortNoteObject(data);
      return (
        <Container fluid>
          <Row noGutters className="note-container-header">
            <Col md="12">
              <NoteHeader />
            </Col>
          </Row>
          <Row noGutters className="note-container-body">
            <Col sm="12" md="10" className="note-menu">
              { allNotes
                ? <NoteList notes={allNotes} />
                : <Label> Click create button to add a note </Label>
              }
            </Col>
          </Row>
        </Container>
      );
    }}
  </Query>
);

export default App;
