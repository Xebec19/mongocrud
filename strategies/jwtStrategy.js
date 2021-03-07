import pkg from 'passport-jwt'
import mongoose from 'mongoose'
import Person from '../models/Person.js'  //import model from person
import { secret } from '../secret/myURL.js'
import passport from 'passport'
const {Strategy,ExtractJwt} = pkg;
var opts={};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken('JWT');
opts.secretOrKey = secret;
passport.use(new Strategy(opts, (jwt_payload,done) => {
    Person.findById(jwt_payload.payload.id)
    .then(person => {
    	if(person){
    		return done (null,person);
    	}
    	return done(null,false);
    })
    .catch(err => console.log(err));
}
));  //passport.use ends here


