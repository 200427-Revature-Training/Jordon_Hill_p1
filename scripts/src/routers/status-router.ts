import express from 'express';
import * as statusService from '../services/status-service';

export const statusRouter = express.Router();

statusRouter.get('', (request, response, next) => {
    statusService.getAllStatus().then(status => {
        response.json(status);
        next();
    }).catch(err => {
        response.sendStatus(500);
        next();
    });
});