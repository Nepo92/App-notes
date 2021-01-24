const setNotes = "SET-NOTES";
const addNote = "ADD-NOTE";
const deleteNote = "DELETE-NOTE";

const initialState = {
  notes: [],
};

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case setNotes:
      return {
        ...state,
      };

    case addNote:
      const newNote = {
        id: state.notes.length + 1,
        from: action.from,
        title: action.title,
        description: action.description,
        date: action.date,
      };

      return {
        ...state,
        ...state.notes,
        notes: [...state.notes, newNote],
      };

    case deleteNote:

      return {
        ...state,
        notes: action.sorting,
      };

    default:
      return state;
  }
};

/* Actions */

export const addNotes = (from, title, description, date, userId) => {
  return {
    type: addNote,
    from,
    title,
    description,
    date,
    userId,
  };
};

export const delNotes = (notes, noteId, userId) => {

  const sorting = notes.filter((item) => {
    if (item.from !== userId || item.from === userId) {
      if (item.id !== noteId && item.from === userId || item.from !== userId) {
        return item;
      }
    }
  })

  return {
    type: deleteNote,
    sorting,
  };
};

export default notesReducer;
