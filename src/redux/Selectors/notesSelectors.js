export const notesSelect = (notes, userId) => {
  const userNotes = notes.filter(item => item.from === userId);

  let count = 1;

  for (let i = 0; i < userNotes.length; i++) {
    userNotes[i].id = count++;
  }

  return userNotes;
}
