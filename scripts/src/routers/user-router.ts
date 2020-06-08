import express from 'express';
import * as userService from '../services/user-service';

export const userRouter = express.Router();

/* POST */

// login
userRouter.post('/login', (request, response, next) => {
    userService.login(request.body)
        .then(user => {
            response.status(200);
            response.json(user);
            next();
        }).catch(err => {
            response.sendStatus(err);
        });
});

// add user to database
userRouter.post('/', (request, response, next) => {
    userService.saveUser(request.body)
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