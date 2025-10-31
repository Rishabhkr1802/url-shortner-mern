import { nanoid } from 'nanoid';

export function generateId(length) {
    return nanoid(length);
}