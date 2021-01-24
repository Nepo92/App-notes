import { setLogout } from "../../redux/authReducer";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import classes from "./Notes.module.scss";
import { delNotes } from "../../redux/notesReducer";
import { notesSelect } from "../../redux/Selectors/notesSelectors";
import { compose } from 'redux';
import withAuthRedirect from "../../hoc/checkAuth";

const Notes = (props) => {
  /* Функция для склонения единиц измерения времени */

  function timeWrite(time, units) {

    const times = Math.floor(time);
    let date;

    const str = String(times).split('');
    /* Часы */

    if (units === 'час') {

      if (str[0] < 2 && str[1] === undefined) {
        return `Добавлено ${times} ${units} назад`;
      }

      if (str[0] > 1 && str[0] < 5 && str[1] === undefined) {
        return `Добавлено ${times} ${units + 'а'} назад`;
      }

      if (str[0] > 4 && str[1] === undefined) {

        return `Добавлено ${times} ${units + 'ов'} назад`;
      }

      if (+str[0] === 1 && +str[1] >= 0) {
        return `Добавлено ${times} ${units + 'ов'} назад`;
      }

      if (+str[0] === 2 && +str[1] === 1) {
        return `Добавлено ${times} ${units} назад`;
      }

      if (+str[0] === 2 && +str[1] > 0) {
        return `Добавлено ${times} ${units + 'ов'} назад`;
      }
    } else if (units === 'день') {

      if (+str[0] === 1 && str[1] === undefined) {
        return `Добавлено вчера`;
      }

      if (+str[0] < 5 && +str[0] !== 1 && str[1] === undefined) {
        return `Добавлено ${times} дня назад`;
      }

      if (+str[0] > 4 && str[1] === undefined) {
        return `Добавлено ${times} дней назад`;
      }

      if (+str[0] === 1 && str[1] !== undefined) {
        return `Добавлено ${times} дней назад`;
      }

      if (+str[0] > 1 && +str[1] === 0) {
        return `Добавлено ${times} дней назад`;
      }

      if (+str[0] > 1 && +str[1] === 1) {
        return `Добавлено ${times} ${units} назад`;
      }

      if (+str[0] > 1 && +str[1] < 5 && str[1] !== undefined) {
        return `Добавлено ${times} дня назад`;
      }

      if (+str[0] > 1 && +str[1] > 4 && str[1] !== undefined) {
        return `Добавлено ${times} дней назад`;
      }
    } else {
      /* Минуты и секунды */

      if (+str[0] < 1 && str[1] === undefined) {
        return `Добавлено только что`;
      }

      if (+str[0] === 1 && str[1] === undefined) {
        return `Добавлено ${times} ${units + 'у'} назад`;
      }

      if (+str[0] < 5 && +str[0] !== 1 && str[1] === undefined) {
        return `Добавлено ${times} ${units + 'ы'} назад`;
      }

      if (+str[0] > 4 && str[1] === undefined) {
        return `Добавлено ${times} ${units} назад`;
      }

      if (+str[0] === 1 && str[1] !== undefined) {
        return `Добавлено ${times} ${units} назад`;
      }

      if (+str[0] > 1 && +str[1] === 0) {
        return `Добавлено ${times} ${units} назад`;
      }

      if (+str[0] > 1 && +str[1] === 1) {
        return `Добавлено ${times} ${units + 'у'} назад`;
      }

      if (+str[0] > 1 && +str[1] < 5 && str[1] !== undefined) {
        return `Добавлено ${times} ${units + 'ы'} назад`;
      }

      if (+str[0] > 1 && +str[1] > 4 && str[1] !== undefined) {
        return `Добавлено ${times} ${units} назад`;
      }
    }
  }
  /* Рендерим note */

  const note = props.notesUser.map((item) => {
    /* Разница во времени между текущим временем и врменем создания note*/

    const diff = new Date() - item.date;

    const seconds = Math.floor(diff / 1000);
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    /* Единицы измерения времени */

    const sec = 'секунд';
    const min = 'минут';
    const hour = 'час';
    const day = 'день';
    /* Дата когда была создана заметка */

    const date = `${item.date.getDate()}-${item.date.getMonth() + 1}-${item.date.getFullYear()}`;
    /* Возвращаем JSX */

    return (
      <li key={item.id} className={classes.notes__item}>
        <div className={classes.notes__content}>
          <p className={classes.notes__subtitle}>{item.title}</p>
          <p className={classes.notes__description}>{item.description}</p>
        </div>
        <p className={classes.notes__date}>
          {date}
        </p>
        <p className={classes.notes__whens}>
          {
            seconds < 60 ? timeWrite(seconds, sec)
              : minutes < 60 ? timeWrite(minutes, min)
                : hours < 24 ? timeWrite(hours, hour)
                  : days < 31 ? timeWrite(days, day)
                    : date
          }
        </p>

        <span className={classes.notes__delete}>
          <span onClick={() => { props.delNotes(props.notesAll, item.id, props.userId) }} tabIndex={"0"} className={classes.notes__button}> </span>
        </span>
      </li>
    );
  });
  /* Возвращаем JSX Для компонеты Notes */

  const logout = () => {
    props.setLogout();
    props.history.push('/login');
  }

  console.log(props.styles);

  return (
    <div className={classes.notes + " " + props.styles.block}>
      <h2 className={classes.notes__title}>Заметки {props.login}:</h2>

      <ul className={classes.notes__list}>
        <li key={0} className={classes.notes__item}>
          <p className={classes.notes__content}>Описание</p>
          <p className={classes.notes__date}> Дата </p>
          <p className={classes.notes__when}> Времени прошло </p>
        </li>
        {note}
      </ul>

      <div className={classes.notes__controls}>
        <NavLink to={"/new"} className={props.styles.navigation}>
          Add
        </NavLink>

        <button onClick={() => { logout() }} className={props.styles.button}>
          Logout
        </button>
      </div>
    </div>
  );
};
/* Пробрасываем в пропсы данные из state */

const mapStateToProps = (state) => {
  return {
    notesAll: state.notes.notes,
    notesUser: notesSelect(state.notes.notes, state.auth.userId),
    login: state.auth.login,
    userId: state.auth.userId,
  };
};
/* Оборачиваем в connect для доступа к state */

export default compose(
  withRouter,
  withAuthRedirect,
  connect(mapStateToProps,
  /* Пробрасываем в пропсы actions из reducer */
  {
    setLogout,
    delNotes,
  }
))(Notes);
