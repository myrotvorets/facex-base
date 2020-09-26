import { FaceXRequest, IFaceXRequestEncoder } from '../interfaces';

export class SvcClientRequestEncoder implements IFaceXRequestEncoder {
    // eslint-disable-next-line class-methods-use-this
    public encode(request: FaceXRequest): Promise<string> {
        const inner = JSON.stringify(request);
        return Promise.resolve(`${inner.length}\r\n${inner}\r\n0\r\n\r\n`);
    }
}
