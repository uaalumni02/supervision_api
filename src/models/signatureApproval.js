import mongoose from "mongoose";
const { Schema } = mongoose;

const supervisionApprovalTypeSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
      ref: "User",
      required: true
  },
  meetingId: {
    type: Schema.Types.ObjectId,
      ref: "Meeting",
      required: true
  },
  __v: {
    type: Number,
    select: false,
  },
});

export default mongoose.model(
  "SupervisionApproval",
  supervisionApprovalTypeSchema
);
