import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Badge,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row,
  Button,
} from 'reactstrap';
import { UPDATE_NOTE_MUTATION, DELETE_NOTE_MUTATION } from '../../graphql/mutation';
import GET_NOTES_QUERY from '../../graphql/queries';
import './note-list.css';

const onChangeaddBulletPoints = (state, event) => {
  state.setState({ description: event.target.value });
};

const setFocustoCurrentNote = (note, state) => {
  state.setState({ id: note.id, description: note.description });
  document.getElementById('noteDescription').focus(); //eslint-disable-line
};

const displayTags = note => note.notetags.map(
  tag => <Badge key={tag.tagId} pill>{tag.tagId}</Badge>,
);

const notesList = (notes, state) => notes.map(note => (
  <ListGroupItem key={note.id} tag="button" onClick={() => setFocustoCurrentNote(note, state)}>
    <ListGroupItemHeading>{note.title}</ListGroupItemHeading>
    <ListGroupItemText>{note.description}</ListGroupItemText>
    {displayTags(note)}
  </ListGroupItem>
));

class NoteList extends Component {
  constructor(props) {
    super(props);
    this.note = props.notes;
    this.state = {
      id: '',
      description: '',
    };
  }

  render() {
    const { id, description } = this.state;
    const { notes } = this.props;
    const waitForRefetchQueries = true;
    return (
      <div className="notepad-area">
        <Container fluid>
          <Row noGutters>
            <Col md="2">
              <div className="note-list">
                <ListGroup>
                  { notesList(notes, this) }
                </ListGroup>
              </div>
            </Col>
            <Col md="8">
              <Form>
                <FormGroup>
                  <Input style={{ height: 700 }} type="textarea" name="text" id="noteDescription" value={description} onChange={e => onChangeaddBulletPoints(this, e)} />
                </FormGroup>
              </Form>
            </Col>
            <Col md="2">
              <Form>
                <FormGroup>
                  <div>
                    <Mutation
                      mutation={UPDATE_NOTE_MUTATION}
                      variables={{ id, description }}
                      refetchQueries={[{ query: GET_NOTES_QUERY }]}
                    >
                      {postMutation => <Button onClick={postMutation}>Update</Button>}
                    </Mutation>
                  </div>
                  <div>
                    <Mutation
                      mutation={DELETE_NOTE_MUTATION}
                      variables={{ id, description }}
                      refetchQueries={[{ query: GET_NOTES_QUERY }]}
                      awaitRefetchQueries={waitForRefetchQueries}
                    >
                      {postMutation => <Button onClick={postMutation}>Delete</Button>}
                    </Mutation>
                  </div>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

NoteList.propTypes = {
  notes: PropTypes.instanceOf(Object).isRequired,
};

export default NoteList;
