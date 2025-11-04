import express, {NextFunction, Request, Response} from "express";
import mongoose from 'mongoose';
import path from "path";
import passport from 'passport'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {fileURLToPath} from "url";
import {config} from "dotenv";
import {connectDB} from "./config/db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.APPLICATION_SERVICE_PORT || '8080';
const corsOptions = {
  origin: ['http://localhost:4200', 'http://localhost:3000', 'http://localhost:8080', 'https://msametiz96.ru'],
  optionsSuccessStatus: 200,
  credentials: true,
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

connectDB();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello TypeScript + Express!');
});
app.get('/health_check', (req: Request, res: Response) => res.status(200).json({status: 'ApplicationService Check OK'}));

app.listen(parseInt(PORT), '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}`);
});