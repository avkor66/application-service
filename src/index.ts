import express, { Request, Response } from 'express';

const app = express();
const PORT = 8080;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello TypeScript + Express!');
});
app.get('/health_check', (req: Request, res: Response) => {
  res.status(200).json({status: 'ApplicationService Check OK'});
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});