import { Router, Request, Response } from 'express';

import { User } from '../models/User';
import * as c from '../../../../config/config';

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { NextFunction } from 'connect';

import * as EmailValidator from 'email-validator';
import { config } from 'bluebird';

const router: Router = Router();
const required_token_bearer_length = 2;
const salt_rounds = 10;

const STATUS_OK = 200, STATUS_CREATED = 201, STATUS_BAD_REQUEST = 400, STATUS_UNAUTHORIZED = 401, STATUS_ALREADY_EXISTS = 403, STATUS_INTERNAL_ERROR = 500;

async function generatePassword(danger_password: string): Promise<string> {

    let salt = await bcrypt.genSalt(salt_rounds);
    return await bcrypt.hash(danger_password, salt);
}

async function comparePasswords(danger_password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(danger_password, hash);
}

function generateJWT(user: User): string {
  return jwt.sign(user.short(), c.config.jwt.secret)
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {

  if (!req.headers || !req.headers.authorization){
      return res.status(STATUS_UNAUTHORIZED).send({ message: 'No authorization headers.' });
  }

  const token_bearer = req.headers.authorization.split(' ');
  const token = token_bearer[1];

  if(token_bearer.length != required_token_bearer_length){
      return res.status(STATUS_UNAUTHORIZED).send({ message: 'Malformed token.' });
  }

  return jwt.verify(token, c.config.jwt.secret , (err, decoded) => {
    if (err) {
      return res.status(STATUS_INTERNAL_ERROR).send({ auth: false, message: 'Failed to authenticate.' });
    }
    return next();
  });
}

router.get('/verification',
    requireAuth,
    async (req: Request, res: Response) => {
        return res.status(STATUS_OK).send({ auth: true, message: 'Authenticated.' });
});

router.post('/login', async (req: Request, res: Response) => {

    const email = req.body.email;
    const password = req.body.password;

    if (!email || !EmailValidator.validate(email)) {
        return res.status(STATUS_BAD_REQUEST).send({ auth: false, message: 'Email is required or malformed.' });
    }

    if (!password) {
        return res.status(STATUS_BAD_REQUEST).send({ auth: false, message: 'Password is required.' });
    }

    const user = await User.findByPk(email);
    if(!user) {
        return res.status(STATUS_UNAUTHORIZED).send({ auth: false, message: 'User was not found..' });
    }

    const authValid = await comparePasswords(password, user.password_hash);

    if(!authValid) {
        return res.status(STATUS_UNAUTHORIZED).send({ auth: false, message: 'Password was invalid.' });
    }

    const jwt = generateJWT(user);
    res.status(STATUS_OK).send({ auth: true, token: jwt, user: user.short()});
});


router.post('/', async (req: Request, res: Response) => {

    const email = req.body.email;
    const danger_password = req.body.password;

    if (!email || !EmailValidator.validate(email)) {
        return res.status(STATUS_BAD_REQUEST).send({ auth: false, message: 'Email is missing or malformed.' });
    }

    if (!danger_password) {
        return res.status(STATUS_BAD_REQUEST).send({ auth: false, message: 'Password is required.' });
    }

    const user = await User.findByPk(email);
    if(user) {
        return res.status(STATUS_ALREADY_EXISTS).send({ auth: false, message: 'User already exists.' });
    }

    const password_hash = await generatePassword(danger_password);

    const newUser = await new User({
        email: email,
        password_hash: password_hash
    });

    let savedUser = await newUser.save();

    const jwt = generateJWT(savedUser);
    res.status(STATUS_CREATED).send({token: jwt, user: savedUser.short()});
});

router.get('/', async (req: Request, res: Response) => {
    res.send('auth')
});

export const AuthRouter: Router = router;
