import * as Response from "../../helpers/response/response";

const checkUserForDelete = (userId, meetingToDelete, res) => {
  if (userId != meetingToDelete.creator) {
    return Response.responseInvalidPermission(res);
  }
};

export const checkUserForEdit = (userId, meetingToUpdate, res) => {
  if (userId != meetingToUpdate.creator._id) {
    return Response.responseInvalidPermission(res);
  }
};

export default  checkUserForDelete;
