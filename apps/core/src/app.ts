// write a sample code to test the logger usinf express and winston logger
import express from 'express';
import logger from './logger';

const app = express();
app.use(logger);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

export default app;

