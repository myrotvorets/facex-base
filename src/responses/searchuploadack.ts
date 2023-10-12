import { type RawResponse, Response } from './response';

// ans_type = 33
export class SearchUploadAck extends Response {
    protected _queueStats: [number, number, number] = [0, 0, 0];

    public constructor(r: RawResponse) {
        super(r);

        const matches = /^AQ=(\d+)\/BQ=(\d+)\/CQ=(\d+)/u.exec(r.data.comment);
        if (matches) {
            this._queueStats = [+matches[1]!, +matches[2]!, +matches[3]!];
        }

        Object.freeze(this._queueStats);
    }

    public get queueStats(): [number, number, number] {
        return this._queueStats;
    }
}
