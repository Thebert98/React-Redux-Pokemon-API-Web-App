const express = require('express');
const app = express();
const configRoutes = require('./routes');
const cors = require('cors')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



configRoutes(app);

app.listen(4000, () => {
  console.log("Server running");
  console.log('Routes running on http://localhost:4000');
});