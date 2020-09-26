import crypto from 'crypto';
import { promisify } from 'util';
import { IGuidGenerator } from '../interfaces';

const randomBytes = promisify(crypto.randomBytes);

export class DefaultGuidGenerator implements IGuidGenerator {
    // eslint-disable-next-line class-methods-use-this
    public async generate(): Promise<string> {
        const buf = await randomBytes(16);
        buf[6] = (buf[6] & 15) | 64;
        buf[8] = (buf[8] & 63) | 128;
        const s: string = buf.toString('hex');
        return `${s.slice(0, 8)}-${s.slice(8, 12)}-${s.slice(12, 16)}-${s.slice(16, 20)}-${s.slice(20, 32)}`;
    }
}
