export const Authentification = (login, password, users, errors) => {
  /* Проверяем ввденные логин и пароль */

  const authChecker = users.filter((item) => item.login === login && item.password === password);
  /* Достаем userId */

  const [userId] = authChecker.map((item) => {
    return item.id;
  });
  /* Достаем Login */

  const [userLogin] = authChecker.map((item) => {
    return item.login;
  });
  /* Если нет совпалений, добавляем ошибку */

  if (!authChecker.length) {
    errors.auth = 'Invalid login or password';
    return false;
  }
  /* Если удачно, возвращаем объект */


  return {
    isAuth: true,
    userId,
    userLogin,
  };
};
