import express from 'express'
import passport from 'passport'
import Tasks from '../../models/Tasks.js'
const router = express.Router()

/*
type: GET
path: /user
desc: For testing authentication
access: Private
*/
router.get(
  "/",
  passport.authenticate("jwt",{session: false}),
  (req,res) => {
    res
    .status(200)
    .json('Success')
  }  //(req,res) ends here
	)  //get ends here

/*
type : POST
route : /user/create/record
desc : for creating records
access : PRIVATE
*/
router
.post(
  "/create/record",
  passport.authenticate("jwt",{session: false}),
  (req,res) => {
  	const {name,date,phone,organization,ratings} = req.body;
    const newRecord = new Tasks({
    	owner: req.user.id,
    	name: name,
    	date: date,
    	phone: phone,
    	organization: organization,
    	ratings: ratings
    });
    newRecord
    .save()
    .then(record => {
    	res
    	.status(200)
    	.json(record)
    })
    .catch(err => {
    	res
    	.status(400)
    	.json({error:`${err}`})
    })
    }
    )

/*
type : GET
route : /user/read/record
desc : for creating records
access : PRIVATE
*/
router.get(
  "/read/record",
  passport.authenticate("jwt",{session:false}),
  (req,res) => {
  	Tasks
  	.findOne({owner:req.user.id})
  	.then(tasks => {
  		if(tasks){
  		res
  		.status(200)
  		.json(tasks)
  	} else {
  		res
  		.status(404)
  		.json({message:"No tasks present"})
  	}
  	})
  }
	)

/*
type : PATCH
route : /user/read/record
desc : for creating records
access : PRIVATE
*/
router.patch(
  "/update/record/:id",
  passport.authenticate("jwt",{session:false}),
  (req,res) => {
  	Tasks.findOneAndUpdate(
      {_id: req.params.id},
       {$set: req.body}
       ,{new: true})
  	.then(profile => {
  		res
  		.status(200)
  		.json(profile)
  	})
  	.catch(err => {
  		res
  		.status(400)
  		.json({error:"Error occured while updating record",err})
  	})
  }
	)  //patch ends here

/*
type : DELETE
route : /user/delete/record/:id
desc : for creating records
access : PRIVATE
*/
router.delete(
	"/delete/record/:id",
	passport.authenticate("jwt",{session:false}),
	(req,res) => {
		Tasks.findOneAndDelete({_id: req.params.id})
			.then(profile => {
				res
				.status(200)
				.json({message:"success"})
			})
			.catch(err => {
				res
				.status(400)
				.json({error:"An error occurred",err})
			})
	}
)  //delete ends here

export default router;