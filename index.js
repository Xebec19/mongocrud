import express from 'express'
import mongoose from 'mongoose'
import passport from 'passport'

const app = express()
const port = 3000

app.use(express.urlencoded({extended: false}));
app.use(express.json());

//import routes
import auth from './routes/api/auth') 

//config for passport used for handling tokens
app.use(passport.initialize());

import { passport } from './strategies/jwtStrategy'

app.get(
  '/',
  (req,res) => {
  	res.send('Hello World!')
  })
app.listen(port, () => {
	console.log(`Running at http://localhost:${port}`)
})