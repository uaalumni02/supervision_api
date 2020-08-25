const isValidUserName = (username) => {
    const regExp = /^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$/i
    return regExp.test(username)
  };

  export default isValidUserName;