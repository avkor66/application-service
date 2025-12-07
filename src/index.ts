import express, {Request, Response} from "express";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {connectDB} from "./config/db.js";
import cartRoutes from "./routes/CartRoutes.js";
import orderRoutes from "./routes/OrderRoutes.js";
import {config} from "./config/config.js";
import productRoutes from "./routes/ProductRoutes.js";

const app = express();
const PORT = config.PORT;
const corsOptions = {
  origin: ['http://localhost:4200', 'http://localhost:3000', 'http://localhost:8080', config.CLIENT_URL!],
  optionsSuccessStatus: 200,
  credentials: true,
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

connectDB();

app.use((req, res, next) => {
  // console.log('=headers', req.headers);
  console.log('=user', req.user)
  console.log('=body', req.body)
  console.log('=query', req.query)
  next()
});


app.use('/products', cors(corsOptions), productRoutes)
app.use('/cart', cors(corsOptions), cartRoutes);
app.use('/order', cors(corsOptions), orderRoutes);
app.get('/health_check', (req: Request, res: Response) => res.status(200).json({status: 'ApplicationService Check OK'}));

app.listen(parseInt(PORT), '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}`);
});