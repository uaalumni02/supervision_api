import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const { log, error } = console;

mongoose.Promise = global.Promise;

const port = process.env.PORT || 3000;

const router = express.Router();

import supervisionTypeRoutes from "./routes/supervisionType.route";
import unitRoutes from "./routes/unit.route";
import userRoutes from './routes/user.route';
import supervisionTypeUnitsRoutes from "./routes/supervisionTypesUnits.route";
import meeetingRoutes from "./routes/meeting.route";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const DB_URL = process.env.MONGO_URL;
const TEST_DB_URL = process.env.MONGO_TEST_URL;

if (process.env.NODE_ENV == "test") {
  mongoose.connect(TEST_DB_URL, { useNewUrlParser: true }, (err) => {
    if (err) return log("Unable to Connect to MongoDB");
    return log("Connection Successful to test DB");
  });
} else {
  mongoose.connect(DB_URL, { useNewUrlParser: true }, (err) => {
    if (err) return log("Unable to Connect to MongoDB");
    return log("Connection Successful");
  });
}

router.use("/supervision", supervisionTypeRoutes);
router.use("/unit", unitRoutes);
router.use('/user', userRoutes);
router.use('/supervisionUnits', supervisionTypeUnitsRoutes);
router.use("/meeting", meeetingRoutes);

app.use("/api", router);

app.listen(port, () => log("server is running"));
