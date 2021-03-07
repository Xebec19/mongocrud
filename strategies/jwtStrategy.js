import {JwtStrategy,ExtractJwt} from 'passport-jwt'
import mongoose from 'mongoose'
import Person from '../models/Person'  //import model from person
import secret from '../secret/myURL'

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret;

const passport = passport.use(new JwtStrategy(opts,  {
    User.findOne({id: jwt_payload.id})
    .then(user => {
    	if(user){
    		return done (null,person);
    	}
    	return done(null,false);
    })
    .catch(err => console.log(err));
}
));  //passport.use ends here

export default passport;

