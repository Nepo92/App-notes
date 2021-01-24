import './App.css';
import classes from './App.module.scss';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
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

  return (
    <div className={classes.app}>
      <Route exact path={"/login"} render={() => <Auth styles={styles} isAuth={props.isAuth} />} />
      <Route exact path={"/notes"} render={() => <Notes styles={styles} userId={props.userId} />} />
      <Route path={"/new"} render={() => <Newer styles={styles} userId={props.userId} />} />

      <StartRoutingComponent />
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


const StartRoutingComponent = compose(withAuthRedirect)(() => <div></div>);

export default compose(
  withRouter,
  connect(mapStateToProps, null),
)(App);
