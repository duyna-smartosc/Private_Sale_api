const express = require('express')

const route = require('./route')

const app = express();
const port = 3000;

app.use(express.json());

app.use('/', route);

app.use((err, req, res, next) => {
  console.log(err);
  return res.status(500).send();
})

app.listen(port, () => {
  console.log(`starting smart contract server on ${port}...`)
})