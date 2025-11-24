import { Request, Response } from 'express';
import fs from 'fs';
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class ProductController {
  static async getAllProducts(req: Request, res: Response) {
    try {
      const jsonString = fs.readFileSync(path.resolve(__dirname, '../data/db.json'), 'utf8');
      const data = JSON.parse(jsonString);
      return res.json(data.products)

    } catch (err) {
      console.error('Ошибка при чтении или парсинге JSON-файла:', err);
      return res.json({products: []})
    }
  }

  static async getAllSeriesGroup(req: Request, res: Response) {
    try {
      const jsonString = fs.readFileSync(path.resolve(__dirname, '../data/series_1_400-15.json'), 'utf8');
      const data = JSON.parse(jsonString);
      return res.json(data)

    } catch (err) {
      console.error('Ошибка при чтении или парсинге JSON-файла:', err);
      return res.json({products: []})
    }
  }

  static async getAllSeriesBrands(req: Request, res: Response) {
    try {
      const jsonString = fs.readFileSync(path.resolve(__dirname, '../data/series_1_400-15_items.json'), 'utf8');
      const data = JSON.parse(jsonString);
      return res.json(data)

    } catch (err) {
      console.error('Ошибка при чтении или парсинге JSON-файла:', err);
      return res.json({products: []})
    }
  }
}