import debug from 'debug';
import { RawResponse, Response } from './responses';
import { responseFactory } from './responsefactory';
import { BadResponseError } from './exceptions';
import { FaceXRequest, IFaceXRequestBuilder, IFaceXRequestEncoder, IRemoteTransport } from './interfaces';

const dbg = debug('facex');
const dbgll = debug('facex:ll');

export class ClientBase {
    protected _url: URL;
    private _transport: IRemoteTransport;
    private readonly _encoder: IFaceXRequestEncoder;
    protected _requestBuilder: IFaceXRequestBuilder;

    public constructor(
        url: string,
        transport: IRemoteTransport,
        encoder: IFaceXRequestEncoder,
        requestBuilder: IFaceXRequestBuilder,
    ) {
        this._url = new URL(url);
        this._transport = transport;
        this._encoder = encoder;
        this._requestBuilder = requestBuilder;
    }

    public get transport(): IRemoteTransport {
        return this._transport;
    }

    public set transport(transport: IRemoteTransport) {
        this._transport = transport;
    }

    protected async _sendRequest<R extends Response>(req: FaceXRequest): Promise<R> {
        dbg(req);
        const encoded = await this._encoder.encode(req);

        const headers = {
            'Content-Type': 'text/json',
            'Content-Length': `${encoded.length}`,
        };

        dbgll('SEND:', encoded);
        const text = await this._transport.post(this._url, encoded, headers);
        dbgll('RECV:', text);

        let body: RawResponse;
        try {
            body = JSON.parse(text) as RawResponse;
        } catch (e) {
            throw new BadResponseError(text);
        }

        const ret = responseFactory(body) as R;
        dbg(ret);
        return ret;
    }

    public rawRequest<R extends Response>(req: FaceXRequest): Promise<R> {
        return this._sendRequest(req);
    }
}
