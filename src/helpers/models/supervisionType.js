const isValidSupervisionType = (type) => {
    const regExp = /^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$/i
    return regExp.test(type)
};

export default isValidSupervisionType