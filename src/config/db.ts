import mongoose from "mongoose";
import { config } from './config.js';

export async function connectDB() {
  const uri = `${config.MONGO_DB_HOST}://${config.MONGO_DB_USER}:${config.MONGO_DB_PASSWORD}@cluster0.ri8xy.mongodb.net/${config.MONGO_DB_COLLECTION}?retryWrites=true&w=majority&appName=Cluster0`;
  try {
    await mongoose.connect(uri);
    console.log('Успешное подключение к MongoDB!');
  } catch (error) {
    console.error('Ошибка подключения:', error);
    process.exit(1);
  }
}