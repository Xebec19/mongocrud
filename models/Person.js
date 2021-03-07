import JwtStrategy from 'passport-jwt'
import ExtractJwt from 'passport-jwt'
import mongoose from 'mongoose'

const PersonSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	}
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