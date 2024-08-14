import express from 'express';
import { json } from 'body-parser';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || '';

const app = express();

app.use(json());

mongoose.connect(MONGO_URI);
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});