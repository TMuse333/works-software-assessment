import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes.js';

dotenv.config();

const app: Application = express();
app.use(cors());

mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error: Error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use(express.json());

app.use('/', routes);

const PORT: number = 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
