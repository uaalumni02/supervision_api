const isValidUnit = (type) => {
    const regExp = /^([0-9]{2})+$/i
    return regExp.test(type)
};

export default isValidUnit