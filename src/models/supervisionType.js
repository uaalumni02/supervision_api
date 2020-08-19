import mongoose from "mongoose";
const { Schema } = mongoose;

import isValidSupervisionType from "../helpers/models/supervisionType";

const supervisionTypeSchema = Schema({
  supervisionType: {
    type: String,
    required: [true, "supervision type is required"],
    min: 4,
    validate: [isValidSupervisionType, "Please enter valid supervision type"],
  },
});

export default mongoose.model("SupervisionType", supervisionTypeSchema);
