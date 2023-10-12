import { streamToBuffer } from '@myrotvorets/buffer-stream';
import type { IImageProcessor } from '../interfaces';
import { BadImageError } from '../exceptions';

export class ImageProcessorDefault implements IImageProcessor {
    public async process(stream: NodeJS.ReadableStream): Promise<string> {
        try {
            const buffer = await streamToBuffer(stream);
            return buffer.toString('base64');
        } catch (e) {
            throw new BadImageError((e as Error).message);
        }
    }
}
