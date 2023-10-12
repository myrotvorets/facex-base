import { randomUUID } from 'node:crypto';
import type { IGuidGenerator } from '../interfaces';

export class DefaultGuidGenerator implements IGuidGenerator {
    public generate(): Promise<string> {
        return Promise.resolve(randomUUID());
    }
}
