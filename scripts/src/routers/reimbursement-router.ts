import express from 'express';
import * as reimbursementService from '../services/reimbursement-service';

export const reimbursementRouter = express.Router();

reimbursementRouter.get('', (request, response, next) => {
    reimbursementService.getAllReimbursements().then(reimbursements => {
        response.json(reimbursements);
        next();
    }).catch(err => {
        response.sendStatus(500);
        next();
    });
});

reimbursementRouter.get('/:userID', (request, response, next) => {
    const userID: number = +request.params.userID;

    reimbursementService.getReimbursementsByUserID(userID).then(reimbursements => {
        if (!reimbursements) {
            response.sendStatus(404);
        } else {
            response.json(reimbursements);
        }
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
        next();
    })
});

reimbursementRouter.get('/status/:status', (request, response, next) => {
    const status: string = request.params.userID;

    reimbursementService.getReimbursementsByStatus(status).then(reimbursements => {
        if (!reimbursements) {
            response.sendStatus(404);
        } else {
            response.json(reimbursements);
        }
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
        next();
    })
});

// add reimbursement to database
reimbursementRouter.post('/', (request, response, next) => {
    reimbursementService.saveReimbursement(request.body).then(newReimbursement => {
        response.status(201);
        response.json(newReimbursement);
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

// update reimbursement
reimbursementRouter.patch('/', (request, response, next) => {
    reimbursementService.updateReimbursement(request.body).then(updatedReimbursement => {
        if(updatedReimbursement) {
            response.json(updatedReimbursement);
        } else {
            response.sendStatus(404);
        }
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    }).finally(() => {
        next();
    })
});

