// to show the last updated time  elapse under every note
const timeDifference = (elapsed) => {
  const milliSecondsPerMinute = 60 * 1000;
  const milliSecondsPerHour = milliSecondsPerMinute * 60;
  const milliSecondsPerDay = milliSecondsPerHour * 24;
  const milliSecondsPerMonth = milliSecondsPerDay * 30;
  const milliSecondsPerYear = milliSecondsPerDay * 365;

  if (elapsed < milliSecondsPerMinute / 3) {
    return '0 sec ago';
  }

  if (elapsed < milliSecondsPerMinute) {
    return 'less than 1 min ago';
  } if (elapsed < milliSecondsPerHour) {
    return `${Math.round(elapsed / milliSecondsPerMinute)} min ago`;
  } if (elapsed < milliSecondsPerDay) {
    return `${Math.round(elapsed / milliSecondsPerHour)} h ago`;
  } if (elapsed < milliSecondsPerMonth) {
    return `${Math.round(elapsed / milliSecondsPerDay)} days ago`;
  } if (elapsed < milliSecondsPerYear) {
    return `${Math.round(elapsed / milliSecondsPerMonth)} mo ago`;
  }
  return `${Math.round(elapsed / milliSecondsPerYear)} years ago`;
};

// gets the time difference based on given time
const getTimeDifference = (date, flag) => {
  const now = new Date().getTime();
  const updated = new Date(date).getTime();
  const elapsed = now - updated;
  return (flag === 'timeDiff') ? elapsed : timeDifference(elapsed);
};

// returns sorted Note object
const sortNoteObject = (data) => {
  if (data && data.getAllNotesAndTags.notes.length) {
    return data.getAllNotesAndTags.notes.sort(
      (n1, n2) => getTimeDifference(n1.created, 'timeDiff') - getTimeDifference(n2.created, 'timeDiff'),
    );
  }
  return null;
};

export default sortNoteObject;
