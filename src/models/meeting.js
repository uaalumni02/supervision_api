import mongoose from "mongoose";
const { Schema } = mongoose;

const meetingSchema = Schema({
  numberOfAttendees: {
    type: String,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: [true, "content is required"],
    min: 5,
    max: 700,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
    required: true,
  },
  attendees: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  units: {
    type: Schema.Types.ObjectId,
    ref: "Unit",
    required: true,
  },
  supervisionType: {
    type: Schema.Types.ObjectId,
    ref: "SupervisionType",
    required: true,
  },
  approval: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  __v: {
    type: Number,
    select: false,
  },
});

// const arrayLimit = (val) => {
//   return val.length <= 5;
// };

export default mongoose.model("Meeting", meetingSchema);
