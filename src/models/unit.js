import mongoose from "mongoose";
const { Schema } = mongoose;

import isValidUnit from "../helpers/models/unit";

const unitSchema = Schema({
  unit: {
    type: String,
    required: [true, "Unit is required"],
    min: 2,
    max: 2,
    validate: [isValidUnit, "Please enter valid unit"],
  },
  __v: {
    type: Number,
    select: false,
  },
});

export default mongoose.model("Unit", unitSchema);



