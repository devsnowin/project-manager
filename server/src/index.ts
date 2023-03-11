require('dotenv').config();
import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/schema';
import connectDB from './config/db';

const PORT = process.env.PORT || 5000;

const app = express();

// Connect to database
connectDB();

app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'DEV',
  })
);

// Serve frontend
if (process.env.NODE_ENV === 'PROD') {
  app.use(express.static(path.join(__dirname, '../../client/dist')));
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(
      path.resolve(__dirname, '../', '../', 'client', 'dist', 'index.html')
    );
  });
}

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT} 🚀`));
