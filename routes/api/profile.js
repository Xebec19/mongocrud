import express from 'express'
import passport from 'passport'
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

export default router;