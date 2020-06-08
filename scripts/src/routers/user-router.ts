import express from 'express';
import * as userService from '../services/user-service';

export const userRouter = express.Router();

/* POST */

// add user to database
userRouter.post('/login', (request, response, next) => {
    const loginData = request.body;
    userService.login(loginData)
        .then(user => {
            response.status(200);
            response.json(user);
            next();
        }).catch(err => {
            response.sendStatus(err);
        });
});

userRouter.post('/', (request, response, next) => {
    const user = request.body;
    userService.saveUser(user)
        .then(newUser => {
            response.status(201);
            response.json(newUser);
            next();
        }).catch(err => {
            if (err === 409) {
                response.status(409);
                response.send("User already exists");
            } else {
                response.sendStatus(err);
            }
        });
});