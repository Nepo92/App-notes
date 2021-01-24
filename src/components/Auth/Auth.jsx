import classes from './Auth.module.scss';
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { setlogin } from "../../redux/authReducer";
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import withAuthRedirect from '../../hoc/checkAuth';

const Login = (props) => {
  /* Форма */
  return (
    <form className={classes.auth__form + ' ' + props.styles.block} onSubmit={props.handleSubmit}>
      <p>Login:</p>
      <Field className={props.styles.input} name={"login"} component={"input"} type={"text"} />
      <p>Password:</p>
      <Field className={props.styles.input} name={"password"} component={"input"} type={"password"} />

      {
        props.isAuth ?
          null
          :
          <p className={classes.auth__error}>{props.authErrors.auth}</p>
      }

      <p>
        <button className={props.styles.button}>Login</button>
      </p>
    </form>
  );
};

/* Оборачиваем форму в redux-form компонент */

const LoginRedux = reduxForm({
  form: "login",
})(Login);

/* Компононет аунтетификации */

const Auth = (props) => {
  const onSubmit = (value) => {
    props.setlogin(value.login, value.password);
    props.history.push('/notes');
  };

  console.log(props);

  return (
    <div className={classes.auth}>
      <LoginRedux onSubmit={onSubmit} isAuth={props.isAuth} authErrors={props.errors} styles={props.styles} />
    </div>
  );
};

/* прокидывем пропсы из state через connect */

const mapStateToProps = (state) => {
  return {
    errors: state.auth.errorLogin,
  }
}

/* Оборачиваем в connect для доступа к state */

export default compose(
  withRouter, 
  connect(mapStateToProps, {
  setlogin,
}))(Auth);
