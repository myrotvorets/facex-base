import { Response } from './response';

// ans_type = 8
export class BaseStatus extends Response {
    public get numberOfRecords(): number {
        return this._raw.data.fotos.length ? this._raw.data.fotos[0].par1 : -1;
    }
}
