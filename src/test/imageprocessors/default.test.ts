import { createReadStream } from 'fs';
import { join } from 'path';
import { ImageProcessorDefault } from '../../imageprocessors/default';
import { BadImageError } from '../../exceptions';

describe('ImageProcessorDefault', () => {
    const processor = new ImageProcessorDefault();

    it('should base64-encode the file without processing it', () => {
        const expected =
            '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDAREAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAAC//EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AP/B//9k=';
        const stream = createReadStream(join(__dirname, '1x1.jpg'));
        return expect(processor.process(stream)).resolves.toStrictEqual(expected);
    });

    it('should throw BadImageError on failure', () => {
        const stream = createReadStream(join(__dirname, 'this-file-does-not-exist'));
        return expect(processor.process(stream)).rejects.toThrow(BadImageError);
    });
});
