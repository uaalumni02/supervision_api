export const checkUserForDelete = (userId, meetingToDelete) => {
  return userId == meetingToDelete.creator;
};

export const checkUserForEdit = (userId, meetingToUpdate, res) => {
  return userId != meetingToUpdate.creator._id;
};
