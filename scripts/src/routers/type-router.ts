import express from 'express';
import * as typeService from '../services/type-service';

export const typeRouter = express.Router();

typeRouter.get('', (request, response, next) => {
    typeService.getAllTypes().then(type => {
        response.json(type);
        next();
    }).catch(err => {
        response.sendStatus(500);
        next();
    });
});