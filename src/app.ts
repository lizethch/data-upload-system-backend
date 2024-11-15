import express from "express";
import dotenv from 'dotenv';
import authRouter from './routers/authRouter';
import uploadRouter from './routers/uploadRouter';
const cors = require('cors');

dotenv.config();
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));


app.use(express.json());

app.use('/', authRouter);
app.use('/upload', uploadRouter);

app.listen(process.env['SERVER_PORT'], () => console.log(`Escuchando al puerto ${process.env['SERVER_PORT']}`));