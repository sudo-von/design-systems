import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (_req, res) => {
  res.status(200).send({
    message: 'Hello World'
  });
});

app.listen(port, () => {
  console.log(`Token Bucket is listening at http://localhost:${port}`);
});
