import express from 'express'
import mongoose from 'mongoose'
import auth from './routes/api/auth.js'
import profile from './routes/api/profile.js'
import {URL} from './secret/myURL.js'
import passport from 'passport'
import './strategies/jwtStrategy.js'
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
	console.log(`!!! An error occurred while connecting mongodb !!! ${err} !!!`)
})

//alternative for body-parsar
app.use(express.urlencoded({extended:false}));  
app.use(express.json());

//Passport middleware
app.use(passport.initialize());


//Routes
app.use("/api/auth",auth);
app.use("/user",profile);

app.listen(port, () => console.log(`App is running at ${port}`));