export interface FaceXRequestPayload {
    client_id: string;
    reqID_clnt: string;
    reqID_serv: string;
    datetime: string;
    segment: string;
    foto: string | null;
    ResultNumber: number;
    par1: number;
    par2: number;
    comment: string;
}

export interface FaceXRequest {
    req_type: number;
    signature: string;
    data: FaceXRequestPayload;
}

export interface IRemoteTransport {
    post(url: URL, data: string, headers: Record<string, string>, timeout?: number): Promise<string>;
}

export interface IFaceXRequestEncoder {
    encode(request: FaceXRequest): Promise<string>;
}

export interface IGuidGenerator {
    generate(): Promise<string>;
}

export interface IImageProcessor {
    process(stream: NodeJS.ReadableStream): Promise<string>;
}

export interface IFaceXRequestBuilder {
    reset(requestType?: number, serverRequestID?: string): this;
    setRequestType(type: number): this;
    setClientID(clientID: string): this;
    setClientRequestID(guid: string): this;
    generateClientRequestID(): Promise<this>;
    setServerRequestID(guid: string): this;
    setDate(date: Date): this;
    setSegment(segment: string): this;
    setPhotoData(s: string): this;
    setPhoto(s: Buffer | string | NodeJS.ReadableStream): Promise<this>;
    setVideo(s: Buffer | string | NodeJS.ReadableStream): Promise<this>;
    setComment(comment: string): this;
    setResultNumber(resultNumber: number): this;
    setParams(par1: number, par2: number): this;
    get(): Promise<FaceXRequest>;
}
