import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

/* Пробрасываем в пропсы hoc данные из state  */

const mapStateTopPropsForRedirect = (state) => {
  return {
    isAuth: state.auth.isAuth,
  }
}
/* High order component */

export const withAuthRedirect = (Component) => {
  /* Компонента для редиректа */
  
  const RedirectComponent = (props) => {
    return (
      <div>
        {
          props.isAuth ?
            <Component {...props} />
            :
            <Redirect to={'/login'} />
        }
      </div>
    )
  }
  /* Оборачиваем redirect component в connect для прокидывания данных в props */

  const ConnectedAuthWithRedirectComponent = connect(mapStateTopPropsForRedirect)(RedirectComponent);
/* Если props.isAuth === false редиректим на страницу логина, иначе возвращаем компоненту указанную в параметрах withAuthRedirect */

  return ConnectedAuthWithRedirectComponent;
}

export default withAuthRedirect;
