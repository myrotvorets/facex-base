import { RawResponse, Response } from './response';

// ans_type = 241
export class VideoUploadAck extends Response {
    protected _queueStats: [number, number, number] = [0, 0, 0];

    public constructor(r: RawResponse) {
        super(r);

        const matches = /^AQ=(\d+)\/BQ=(\d+)\/CQ=(\d+)/u.exec(r.data.comment);
        if (matches) {
            this._queueStats = [parseInt(matches[1]!, 10), parseInt(matches[2]!, 10), parseInt(matches[3]!, 10)];
        }

        Object.freeze(this._queueStats);
    }

    public get queueStats(): [number, number, number] {
        return this._queueStats;
    }

    public override isError(): boolean {
        return this.resultCode < 0;
    }
}
