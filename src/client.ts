import { ClientBase } from './clientbase';
import { ClientRequestEncoder } from './encoders/client';
import { Commands } from './request/commands';
import type { IFaceXRequestBuilder, IRemoteTransport } from './interfaces';
import type * as R from './responses';

export type PhotoType = Buffer | string | NodeJS.ReadableStream;
export type PhotoUploadPriority = 'A' | 'B' | 'C';

export class Client extends ClientBase {
    public constructor(url: string, transport: IRemoteTransport, requestBuilder: IFaceXRequestBuilder) {
        super(url, transport, new ClientRequestEncoder(), requestBuilder);
    }

    public async baseStatus(): Promise<R.BaseStatus> {
        const builder = this._requestBuilder.reset(Commands.BASE_STATUS);
        return this._sendRequest(await builder.get());
    }

    public async uploadPhotoForSearch(
        photo: PhotoType,
        priority: PhotoUploadPriority = 'C',
        comment = '',
        minSimialrity = 0,
    ): Promise<R.SearchUploadAck | R.SearchUploadError> {
        if (minSimialrity < 0 || minSimialrity > 1000) {
            minSimialrity = 0;
        }

        const builder = await this._requestBuilder
            .reset(Commands.UPLOAD_SRCH)
            .setComment(comment)
            .setClientID(priority)
            .setParams(minSimialrity, 0)
            .setPhoto(photo);

        return this._sendRequest(await builder.get());
    }

    public async checkSearchStatus(guid: string): Promise<R.SearchInProgress | R.SearchFailed | R.SearchCompleted> {
        const builder = this._requestBuilder.reset(Commands.SRCH_STATUS, guid);
        return this._sendRequest(await builder.get());
    }

    public async getCapturedFaces(guid: string): Promise<R.CapturedFaces | R.CapturedFacesError | R.SearchInProgress> {
        const builder = this._requestBuilder.reset(Commands.CAPTURED_FACES, guid);
        return this._sendRequest(await builder.get());
    }

    public async getRecognitionStats(
        guid: string,
        n: number,
    ): Promise<R.RecognitionStats | R.RecognitionStatsNotAvailable> {
        const builder = this._requestBuilder.reset(Commands.RECOGNITION_STATS, guid).setResultNumber(n);
        return this._sendRequest(await builder.get());
    }

    public async getMatchedFaces(
        guid: string,
        n: number,
        offset = 0,
        count = 20,
    ): Promise<R.Response | R.MatchedFaces> {
        const builder = this._requestBuilder
            .reset(Commands.MATCHED_FACES, guid)
            .setResultNumber(n)
            .setParams(offset, count);

        return this._sendRequest(await builder.get());
    }

    public async startCompare(
        photo: Buffer | string | NodeJS.ReadableStream,
        photos: number,
        comment = '',
    ): Promise<R.StartCompareAck> {
        const builder = await this._requestBuilder
            .reset(Commands.START_COMPARE)
            .setComment(comment)
            .setResultNumber(photos)
            .setPhoto(photo);

        return this._sendRequest(await builder.get());
    }

    public async uploadPhotoForComparison(
        photo: Buffer | string | NodeJS.ReadableStream,
        guid: string,
        n: number,
        cnt: number,
        name: string,
    ): Promise<R.UploadCompareAck> {
        const builder = await this._requestBuilder
            .reset(Commands.UPLOAD_COMPARE, guid)
            .setComment(name)
            .setResultNumber(cnt)
            .setParams(n, 0)
            .setPhoto(photo);

        return this._sendRequest(await builder.get());
    }

    public async getComparisonResults(guid: string): Promise<R.Response | R.CompareCompleted> {
        const builder = this._requestBuilder.reset(Commands.GET_COMPARISON_RESULTS, guid);
        return this._sendRequest(await builder.get());
    }
}
