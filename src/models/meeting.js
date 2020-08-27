import mongoose from "mongoose";
const { Schema } = mongoose;

const meetingSchema = Schema({
  numberOfAttendees: {
    type: String,
    required: [true, "Number of attendees are required"],
    min: 2,
    max: 2,
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
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  attendees: [
    {
      type: String,
      validate: [arrayLimit, "exceeds the limit of 5"],
    },
  ],
  units: {
    type: Schema.Types.ObjectId,
    ref: "Unit",
  },
  supervisionType: {
    type: Schema.Types.ObjectId,
    ref: "SupervisionType",
  },
  approval: [
    {
      type: String,
      ref: "User",
    },
  ],
  __v: {
    type: Number,
    select: false,
  },
});

const arrayLimit = (val) => {
  return val.length <= 5;
};

export default mongoose.model("Meeting", meetingSchema);


