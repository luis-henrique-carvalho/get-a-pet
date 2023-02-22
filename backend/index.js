const express = require("express");
const cors = require('cors')
const app = express();

const port = 5000;

// config JSON response
app.use(express.json());

// solve
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))


app.use(express.static("public"));

// Routes
const UserRoutes = require('./routes/UserRoutes')

app.use('/users', UserRoutes)

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
