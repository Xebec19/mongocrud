import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const router = express.Router();

/*
type: GET
route: /api/auth
desc just for testing
access PUBLIC
*/
router.get(
  "/",
  (req,res) => 
  res.json({test: "Working Successful"})
	)

/*
type: POST
route: /api/auth/register
for registering new user
access PRIVATE
*/
router.post(
  "/register",
  (req,res) => {
  	const {name,email,password} = req.body
  	try{
	  bcrypt.hash(password, 8, (err, hash) => {
      if(err) throw err;
	  
	});
  	}
  	catch(err){
  		console.log('Error occurred in auth.js route /api/auth/register',err);
  	}
  }
	)


export default router