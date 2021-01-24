import './App.css';
import classes from './App.module.scss';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Auth from './components/Auth/Auth.jsx';
import Notes from './components/Notes/Notes.jsx';
import Newer from './components/Newer/Newer.jsx';
import { compose } from 'redux';
import withAuthRedirect from './hoc/checkAuth';

function App(props) {
  const styles = {
    block: 'App_block__1W9cI',
    input: 'App_input__3ah8v',
    button: 'App_button__gvtSE',
    navigation: 'App_navigation__3Bo0R',
  }
  console.log(props);
  return (
    <div className={classes.app}>
      {props.isAuth ? (
        <Route exact path={"/notes"} render={() => <Notes styles={styles} userId={props.userId} />} />
      ) : (
          <Route exact path={"/login"} render={() => <Auth styles={styles} isAuth={props.isAuth} />} />
        )}

      <Route path={"/new"} render={() => <Newer styles={styles} userId={props.userId} />} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    userId: state.auth.userId,
  }
}

export default compose(
  // withAuthRedirect,
  connect(mapStateToProps, null)

  )(App);
