import mongoose from "mongoose";
const { Schema } = mongoose;

const supervisionApprovalTypeSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
      ref: "User",
      required: true
  },
  meeting: {
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
