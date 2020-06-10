import { Type } from '../models/Type';
import * as typeDao from '../daos/type-dao';

export function getAllTypes(): Promise<Type[]> {
    return typeDao.getAllTypes();
}