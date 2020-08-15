import express from 'express';
import 'dotenv/config';
import cors from 'cors';

const app = express();
const { log, error } = console;

const port = process.env.PORT || 3000;

app.listen(port, () => log("server is running"));
