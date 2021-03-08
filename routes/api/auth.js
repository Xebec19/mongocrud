import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {secret} from '../../secret/myURL.js'
//import models
import Person from '../../models/Person.js'
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
type : POST
route : /api/auth/register
desc : for registering new user
access : PUBLIC
*/
router.post(
  "/register",
  (req,res) => {
  	const {name,email,password} = req.body;
    Person.findOne({email: email})
    .then(person => {
    if(person){
      return res
      .status(400)
      .json({usererror: "!!!Email already exists!!!"})
    } else {
      bcrypt.hash(password, 8, (err, hash) => {
      if(err) throw err;
      /*res.status(200).json(hash);*/
      //hash contains hashed password
      const newPerson = new Person({
        name: name,
        email: email,
        password: hash
      });
      newPerson
      .save()
      .then(person => {
        res
        .status(200)
        .json(person)
      })
      .catch(err => {
        res
        .status(404)
        .json({error:"!!!Error occured while registering new user!!! ",err})
      })  //newPerson ends here
      });  //bcrypt ends here
    }  //else ends here
    }
    )
    .catch(err => {
      res
      .status(404)
      .json({autherror:"!!!Error occurred while registering!!!"})
    }
    )  //catch ends here
  }
	)

/*
type : POST
route : /api/auth/login
desc : for logging in existing user
access : PRIVATE
*/
router.post(
  "/login",
  (req,res) => {
    const {email,password} = req.body;
    Person.findOne({email:email})
    .then(person => {
      if(!person){
        res
        .status(404)
        .json({error:"!!!Email not found!!!"});
      }
      bcrypt.compare(password, person.password, (err,boo) => {
        if(err) throw err;
        if(!boo){
          res
          .status(404)
          .json({usererror:"User and Password mismatch"})
        } 
        /*res
        .status(200)
        .json({message:"Success"})*/
        const payload = {
          id: person.id,
          name: person.name,
          email: person.email
        };
        jwt.sign(
          {payload},
          secret,
          {expiresIn: '5h'},
          (err,token) => {
            if(err) throw err;
            res.json({
              success: true,
              token: "Bearer " + token
            })
          }
          )
      });
      
    })  //then ends here
    .catch(err => {
      res
      .status(400)
      .json({error:"!!!Error occurred while logging in!!!"})
    })
  }  
)


export default router