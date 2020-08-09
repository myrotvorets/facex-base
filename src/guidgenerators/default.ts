import crypto from 'crypto';
import { promisify } from 'util';
import { IGuidGenerator } from '../interfaces';

const randomBytes = promisify(crypto.randomBytes);

export class DefaultGuidGenerator implements IGuidGenerator {
    public generate(): Promise<string> {
        return randomBytes(16).then((buf) => {
            buf[6] = (buf[6] & 0x0f) | 0x40;
            buf[8] = (buf[8] & 0x3f) | 0x80;
            const s: string = buf.toString('hex');
            return (
                s.slice(0, 8) +
                '-' +
                s.slice(8, 12) +
                '-' +
                s.slice(12, 16) +
                '-' +
                s.slice(16, 20) +
                '-' +
                s.slice(20, 32)
            );
        });
    }
}
