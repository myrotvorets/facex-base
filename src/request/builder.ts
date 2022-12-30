import { createReadStream } from 'fs';
import { BufferStream, streamToBuffer } from '@myrotvorets/buffer-stream';
import { FaceXRequest, IFaceXRequestBuilder, IGuidGenerator, IImageProcessor } from '../interfaces';

export class FaceXRequestBuilder implements IFaceXRequestBuilder {
    private readonly _clientId: string;
    private readonly _guidGenerator: IGuidGenerator;
    private readonly _imageProcessor: IImageProcessor;
    private _request!: FaceXRequest;

    public constructor(clientId: string, guidGenerator: IGuidGenerator, imageProcessor: IImageProcessor) {
        this._clientId = clientId;
        this._guidGenerator = guidGenerator;
        this._imageProcessor = imageProcessor;

        this.reset();
    }

    public reset(requestType = 0, serverRequestID = ''): this {
        this._request = {
            req_type: requestType,
            signature: '',
            data: {
                client_id: this._clientId,
                reqID_clnt: '',
                reqID_serv: serverRequestID,
                datetime: new Date().toJSON(),
                segment: '0',
                foto: '',
                ResultNumber: 0,
                par1: 0,
                par2: 0,
                comment: '',
            },
        };

        return this;
    }

    public setRequestType(type: number): this {
        this._request.req_type = type;
        return this;
    }

    public setClientID(clientID: string): this {
        this._request.data.client_id = clientID;
        return this;
    }

    public setClientRequestID(guid: string): this {
        this._request.data.reqID_clnt = guid;
        return this;
    }

    public async generateClientRequestID(): Promise<this> {
        this._request.data.reqID_clnt = await this._guidGenerator.generate();
        return this;
    }

    public setServerRequestID(guid: string): this {
        this._request.data.reqID_serv = guid;
        return this;
    }

    public setDate(date = new Date()): this {
        this._request.data.datetime = date.toJSON();
        return this;
    }

    public setSegment(segment: string): this {
        this._request.data.segment = segment;
        return this;
    }

    public setPhotoData(s: string): this {
        this._request.data.foto = s;
        return this;
    }

    public async setPhoto(s: Buffer | string | NodeJS.ReadableStream): Promise<this> {
        let stream: NodeJS.ReadableStream;
        if (Buffer.isBuffer(s)) {
            stream = new BufferStream(s);
        } else if (typeof s === 'string') {
            stream = createReadStream(s, { emitClose: true });
        } else {
            stream = s;
        }

        this._request.data.foto = await this._imageProcessor.process(stream);
        return this;
    }

    public async setVideo(s: Buffer | string | NodeJS.ReadableStream): Promise<this> {
        let b: Buffer;
        if (Buffer.isBuffer(s)) {
            b = s;
        } else if (typeof s === 'string') {
            b = Buffer.from(s);
        } else {
            b = await streamToBuffer(s);
        }

        this._request.data.foto = b.toString('base64');
        return this;
    }

    public setComment(comment: string): this {
        this._request.data.comment = comment;
        return this;
    }

    public setResultNumber(resultNumber: number): this {
        this._request.data.ResultNumber = resultNumber;
        return this;
    }

    public setParams(par1: number, par2: number): this {
        this._request.data.par1 = par1;
        this._request.data.par2 = par2;
        return this;
    }

    public async get(): Promise<FaceXRequest> {
        if (!this._request.data.reqID_clnt) {
            await this.generateClientRequestID();
        }

        return this._request;
    }
}
