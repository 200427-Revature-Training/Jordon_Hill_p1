import { Reimbursement } from '../models/Reimbursement';
import * as reimbDao from '../daos/reimbursement-dao';

export function getAllReimbursements(): Promise<Reimbursement[]> {
    return reimbDao.getAllReimbursements();
}

export function getReimbursementsByUserID(userID: number): Promise<Reimbursement[]> {
    return reimbDao.getReimbursementsByUserID(userID);
}

export function getReimbursementsByStatusAndType(statusID: number, typeID: number): Promise<any[]> {
    return reimbDao.getReimbursementsByStatusAndType(statusID, typeID);
}

export function saveReimbursement(reimbursement: any): Promise<Reimbursement> {
    if(!(reimbursement.amount && reimbursement.description && reimbursement.receipt
         && reimbursement.author && reimbursement.type)) {
        return new Promise((resolve, reject) => reject(422));
    }
    const newReimbursement = new Reimbursement(
        undefined, reimbursement.amount, new Date(), undefined,
            reimbursement.description, reimbursement.receipt, reimbursement.author,
            undefined, 1, reimbursement.type
    );
    return reimbDao.saveReimbursement(newReimbursement);
}

export function updateReimbursement(reimbursement: any): Promise<Reimbursement> {
    const dateSubmitted = reimbursement.dateSubmitted && new Date(reimbursement.dateSubmitted);
    const dateResolved = reimbursement.dateSubmitted && new Date(reimbursement.dateSubmitted);

    const reimbursementData = new Reimbursement(
        reimbursement.id, reimbursement.amount, dateSubmitted, dateResolved,
            reimbursement.description, reimbursement.receipt, reimbursement.authorID,
            reimbursement.resolverID, reimbursement.statusID, reimbursement.typeID
    );
    if (!reimbursementData.id) {
        return new Promise((resolve, reject) => reject(400));
    }
    return reimbDao.updateReimbursement(reimbursementData);
}