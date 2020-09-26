import { ClientBase } from './clientbase';
import { SvcClientRequestEncoder } from './encoders/svcclient';
import { AdminCommands } from './request/commands';
import { IFaceXRequestBuilder, IRemoteTransport } from './interfaces';
import * as R from './responses';

export class SvcClient extends ClientBase {
    public constructor(url: string, transport: IRemoteTransport, requestBuilder: IFaceXRequestBuilder) {
        super(url, transport, new SvcClientRequestEncoder(), requestBuilder);
    }

    public async numberOfRecords(): Promise<R.NumberOfRecords> {
        const builder = this._requestBuilder.reset(AdminCommands.BASE_STATUS);
        return this._sendRequest(await builder.get());
    }

    public async querySector(sector: string): Promise<R.QuerySectorAck> {
        const builder = this._requestBuilder.reset(AdminCommands.SECTOR_REQUEST_INIT).setComment(sector);
        return this._sendRequest(await builder.get());
    }

    public async querySectorStatus(guid: string): Promise<R.QuerySectorStatus> {
        const builder = this._requestBuilder.reset(AdminCommands.SECTOR_REQUEST_STATUS, guid);
        return this._sendRequest(await builder.get());
    }

    public async getFaces(guid: string, sector: string, start = 0, count = -1): Promise<R.QuerySectorResult> {
        const builder = this._requestBuilder
            .reset(AdminCommands.SECTOR_REQUEST_RESULT, guid)
            .setParams(start, count)
            .setComment(sector);

        return this._sendRequest(await builder.get());
    }

    public async querySectorStats(): Promise<R.QuerySectorStatsAck> {
        const builder = this._requestBuilder.reset(AdminCommands.SECTOR_STATS_INIT);
        return this._sendRequest(await builder.get());
    }

    public async querySectorStatsResult(guid: string): Promise<R.QuerySectorStatsResult> {
        const builder = this._requestBuilder.reset(AdminCommands.SECTOR_STATS_RESULT, guid);
        return this._sendRequest(await builder.get());
    }

    public async preparePhotoForAddition(
        photo: Buffer | string | NodeJS.ReadableStream,
        sector: string,
        filename: string,
    ): Promise<R.PrepareAddAck> {
        const builder = await this._requestBuilder
            .reset(AdminCommands.INSERT_INIT)
            .setComment(`${sector}<${filename}`)
            .setPhoto(photo);

        return this._sendRequest(await builder.get());
    }

    public async getPrepareStatus(guid: string): Promise<R.PrepareAddStatus> {
        const builder = this._requestBuilder.reset(AdminCommands.INSERT_STATUS, guid);
        return this._sendRequest(await builder.get());
    }

    public async getPreparedFaces(guid: string): Promise<R.PreparedFaces> {
        const builder = this._requestBuilder.reset(AdminCommands.INSERT_GET_FACES, guid);
        return this._sendRequest(await builder.get());
    }

    public async addPreparedFaces(guid: string, list?: number[]): Promise<R.AddPreparedFacesAck> {
        const items = Buffer.from(list ? list.join('*') : '-1', 'binary').toString('base64');
        const builder = this._requestBuilder.reset(AdminCommands.INSERT_PROCESS, guid).setPhotoData(items);
        return this._sendRequest(await builder.get());
    }

    public async deleteFace(items: string[]): Promise<R.DeleteAck> {
        const data = Buffer.from(`${items.join('\r\n')}\r\n`, 'binary').toString('base64');
        const builder = this._requestBuilder.reset(AdminCommands.DELETE_INIT).setPhotoData(data);
        return this._sendRequest(await builder.get());
    }

    public async deleteFaceResult(guid: string): Promise<R.DeleteStatus> {
        const builder = this._requestBuilder.reset(AdminCommands.DELETE_STATUS, guid);
        return this._sendRequest(await builder.get());
    }
}
