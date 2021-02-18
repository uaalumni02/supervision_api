const responseBadRequest = (res) => {
    return res.status(400).json({
        success: false,
        message: 'unable to save provided input'
    });
}

const responseNotFound = (res) => {
    return res.status(404).json({
        success: false,
        message: 'Unable to show response'
    });
}

const responseOkCreated = (res, data) => {
    return res.status(201).json({
        success: true,
        message: "added",
        data
    });
}

const responseOk = (res, data) => {
    return res.status(200).json({
        success: true,
        data, 
    });
}
const responseConflict = (res) => {
    return res.status(409).json({
        success: false,
        message: 'user name or email exist'
    });
}
const responseBadAuth = (res) => {
    return res.status(401).json({
        success: false,
        message: 'auth failed',
    });
}

const responseOkUserCreated = (res, userdata) => {
    return res.status(201).json({
        success: true,
        message: "user successfully added",
        userdata,
    });
}

const responseServerError = (res) => {
    return res.status(500).json({
        success: false,
        message: "internal server error",
    });
}
const responseValidationError = (res) => {
    return res.status(400).json({
        success: false,
        message: 'Validation Error, bad request'
    });
}
const responsesOk = (res, units, supervision) => {
    return res.status(200).json({
        success: true,
        units,
        supervision
    });
}
const responseOkUserLoggedIn = (res, userdata) => {
    return res.status(201).json({
        success: true,
        message: "user successfully added",
        userdata,
    });
}
const responseInvalidCredentials = (res) => {
    return res.status(401).json({
        success: false,
        message: 'Invalid log in credentials provided',
    });
}
const responseInvalidPassword = (res) => {
    return res.status(401).json({
        success: false,
        message: 'Invalid Password',
    });
}
const responseUserNotFound = (res) => {
    return res.status(404).json({
        success: false,
        message: 'User Not Found'
    });
}
const responseTokenExpired = (res) => {
    return res.status(401).json({
        success: false,
        message: 'Reset token is not valid or has expired',
    });
}
const responseOkTokenCreated = (res, data) => {
    return res.status(201).json({
        success: true,
        message: "Will send reset link to email",
        data
    });
}
const responseEmailNotFound = (res) => {
    return res.status(404).json({
        success: false,
        message: "Will send reset link to email"
    });
}
const responseOkUpdated = (res, data) => {
    return res.status(200).json({
        success: true,
        data, 
        message: "Password reset successful, proceed to login",
    });
}
const responseInvalidConfirmation = (res) => {
    return res.status(401).json({
        success: false,
        message: 'Passwords do not match ',
    });
}
const responseAlreadySigned = (res) => {
    return res.status(401).json({
        success: false,
        message: 'Document already signed',
    });
}

const responseInvalidPermission = (res) => {
    return res.status(401).json({
        success: false,
        message: 'Not authorized to edit or delete data',
    });
}
export {
    responseBadRequest,
    responseNotFound,
    responseOkCreated,
    responseOk,
    responseConflict,
    responseBadAuth,
    responseOkUserCreated,
    responseServerError,
    responseValidationError, 
    responsesOk,
    responseOkUserLoggedIn,
    responseInvalidCredentials,
    responseInvalidPassword,
    responseUserNotFound,
    responseTokenExpired,
    responseOkTokenCreated,
    responseEmailNotFound,
    responseOkUpdated,
    responseInvalidConfirmation,
    responseAlreadySigned,
    responseInvalidPermission 
}