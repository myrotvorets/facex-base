import { IFaceXRequestEncoder, FaceXRequest } from '../interfaces';

export class ClientRequestEncoder implements IFaceXRequestEncoder {
    public encode(request: FaceXRequest): Promise<string> {
        return Promise.resolve(JSON.stringify(request));
    }
}
