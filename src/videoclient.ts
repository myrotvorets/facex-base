import { ClientBase } from './clientbase';
import { IFaceXRequestBuilder, IRemoteTransport } from './interfaces';
import { ClientRequestEncoder } from './encoders/client';
import { VideoCommands } from './request/commands';
import * as R from './responses';

type VideoType = Buffer | string | NodeJS.ReadableStream;

export class VideoClient extends ClientBase {
    public constructor(url: string, transport: IRemoteTransport, requestBuilder: IFaceXRequestBuilder) {
        super(url, transport, new ClientRequestEncoder(), requestBuilder);
    }

    public async uploadVideo(video: VideoType): Promise<R.VideoUploadAck> {
        const builder = await this._requestBuilder.reset(VideoCommands.VIDEO_UPLOAD).setVideo(video);
        return this._sendRequest(await builder.get());
    }

    public async getVideoStatus(guid: string): Promise<R.VideoStatus> {
        const builder = this._requestBuilder.reset(VideoCommands.VIDEO_STATUS, guid);
        return this._sendRequest(await builder.get());
    }

    public async getVideoResult(guid: string, type: 'detect' | 'match', archiveNumber = 1): Promise<R.VideoResult> {
        const builder = this._requestBuilder.reset(VideoCommands.VIDEO_RESULT, guid);
        builder.setParams(type === 'detect' ? 1 : 2, archiveNumber);
        return this._sendRequest(await builder.get());
    }
}
