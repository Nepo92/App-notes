import {combineReducers, createStore} from "redux";
import authReducer from "./authReducer";
import {reducer as formReducer} from 'redux-form';
import notesReducer from "./notesReducer";

const reducers = combineReducers({
  auth: authReducer,
  notes: notesReducer,
  form: formReducer,
})

const store = createStore(reducers);

export default store;

window.store = store;
