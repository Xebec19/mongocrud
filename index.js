import express from 'express'

import auth from './routes/api/auth.js';

const port = process.env.PORT || 3000 
const app = express();

app.use("/api/auth",auth);

app.listen(port, () => console.log(`App is running at ${port}`));