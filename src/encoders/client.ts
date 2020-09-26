import { FaceXRequest, IFaceXRequestEncoder } from '../interfaces';

export class ClientRequestEncoder implements IFaceXRequestEncoder {
    // eslint-disable-next-line class-methods-use-this
    public encode(request: FaceXRequest): Promise<string> {
        return Promise.resolve(JSON.stringify(request));
    }
}
