import { Status } from '../models/Status';
import * as statusDao from '../daos/status-dao';

export function getAllStatus(): Promise<Status[]> {
    return statusDao.getAllStatus();
}