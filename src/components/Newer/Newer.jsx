import classes from "./Newer.module.scss";
import {NavLink, withRouter} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {addNotes} from "../../redux/notesReducer";
import {compose} from "redux";
import withAuthRedirect from "../../hoc/checkAuth";

/* Форма добавления новой заметки */

const newNote = (props) => {
  return (
    <form className={classes.new__form} onSubmit={props.handleSubmit}>

      <p>Title</p>
      <Field className={props.styles.input} name={"title"} component={'input'}/>

      <p>Description</p>
      <Field className={classes.new__textarea} name={"description"} component={"textarea"} />

      <div className={classes.new__controls}>
        <button className={props.styles.button}>Add</button>

        <NavLink to={"/notes"} className={props.styles.navigation}>
          Back
        </NavLink>
      </div>
    </form>
  );
};

/* Оборачиваем форму в redux-form компоненту */

const NewNoteRedux = reduxForm({
 form: 'newNote'
})(newNote);

/* Компонента добавления новой заметки */

const Newer = (props) => {
  const onSubmit = (values) => {
    const dateNote = new Date();

    if (values.title !== undefined && values.description !== undefined) {
      props.addNotes(props.userId, values.title, values.description, dateNote, props.userId);
      props.history.push('/notes');
    }
  }

  return (
    <div className={classes.new + ' ' + props.styles.block}>
      <NewNoteRedux onSubmit={onSubmit} styles={props.styles} />
    </div>
  )
};

/* Добавляем compose для того чтобы добавлять несколько оберток для компоненты Newer */

export default compose(
  /* WithRouter для того чтобы перенаправлять пользователя на страницу с помощью history.push() */

  withRouter,
  /*Connect для доступа к state*/

  connect(null, {
  addNotes,
}), 
/* withAutoRedirect - hight order component для редиректа на страницу логина, если не залогинины */

withAuthRedirect)(Newer);
