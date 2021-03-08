import mongoose from 'mongoose'
import Tasks from './Tasks.js'

const PersonSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});


const Person = mongoose.model("myPerson",PersonSchema);
export default Person;