import pkg from 'mongodb'
const {ObjectId} = pkg
import mongoose from 'mongoose'
import Person from './Person.js'

const TaskSchema = new mongoose.Schema({
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "myPerson"
	},
	name: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	phone: {
		type: Number,
		required: true
	},
	organization: {
		type: String,
		required: true
	},
	ratings: {
		type: Number,
		max: 5,
		min: 0,
		required: true
	}
	
})

const Tasks = mongoose.model("Tasks",TaskSchema);
export default Tasks;