import { Record as ImmutableRecord, List as ImmutableList } from 'immutable';

export const Tag = ImmutableRecord({
  tagId: '',
  tagName: '',
});

export const Note = ImmutableRecord({
  id: '',
  title: '',
  description: '',
  created: '',
  lastUpdate: '',
  timeDiff: 0,
  tags: new ImmutableList(),
});

export const NoteObject = ImmutableRecord({
  note: new ImmutableList(),
});
