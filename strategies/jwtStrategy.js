import {JwtStrategy,ExtractJwt} from 'passport-jwt'
import mongoose from 'mongoose'
import Person from '../models/Person'  //import model from person
import secret from '../secret/myURL'

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';


