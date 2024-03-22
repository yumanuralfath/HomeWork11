import express from 'express';
import dotenv from 'dotenv'
import expressSession from 'express-session'
import { PrismaSessionStore } from '@quixo3/prisma-session-store'
import { PrismaClient } from '@prisma/client';
import router from './src/routers/Routes.js';
import errorHandler from './src/middlewares/errorHandler.js';
dotenv.config()
const app = express();

app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000 // ms
    },
    secret: process.env.SESS_SECRET,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(
      new PrismaClient(),
      {
        checkPeriod: 2 * 60 * 1000,  //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }
    )
  })
);
app.use(express.json());
app.use(router)
app.use(errorHandler);


export default app;

