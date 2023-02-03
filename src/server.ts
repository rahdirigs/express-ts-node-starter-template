import dotenv from 'dotenv';
import type { Request, Response } from 'express';
import express from 'express';

import { errorHandler, notFound } from './middlewares/error.middleware';

dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'production';

const app = express();
app.use(express.json());

if (NODE_ENV === 'development') {
  app.get('/', (_req: Request, res: Response) => {
    res.status(200).json({
      message: 'API is running',
    });
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} in ${NODE_ENV} mode...`);
});
