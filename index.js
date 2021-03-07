import express from 'express'
import mongoose from 'mongoose'
import auth from './routes/api/auth.js'
import {URL} from './secret/myURL.js'

const port = process.env.PORT || 3000  //PORT NUMBER
const app = express();

//config mongoDB
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
.then(() => {
	console.log('MongoDB connected')
})
.catch(err => {
	console.log(`!!! An error occurred while connecting mongodb ${err} !!!`)
})

app.use(express.urlencoded({extended:false}));  //alternative for body-parsar
app.use(express.json());

app.use("/api/auth",auth);

app.listen(port, () => console.log(`App is running at ${port}`));