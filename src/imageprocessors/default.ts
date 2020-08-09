import { streamToBuffer } from '@myrotvorets/buffer-stream';
import { IImageProcessor } from '../interfaces';
import { BadImageError } from '../exceptions';

export class ImageProcessorDefault implements IImageProcessor {
    public async process(stream: NodeJS.ReadableStream): Promise<string> {
        return streamToBuffer(stream)
            .then((buffer) => buffer.toString('base64'))
            .catch((e: Error) => Promise.reject(new BadImageError(e.message)));
    }
}
