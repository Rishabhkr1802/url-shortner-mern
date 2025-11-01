import { nanoid } from 'nanoid';

export function generateNanoID(length) {
    return nanoid(length);
}