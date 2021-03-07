import express from 'express'

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

export default router