import { RawResponse, Response } from './response';

// 228311, 0e:e2:87, !1-0-975495-975501, 1-0, 14, D:\Face_DB\0E\E2\87\!1-0-975495-975501.jpg;create_time=23.08.2020 6:48:03;list=14/0E0000, 37aa324e-8335-4b03-a77f-ea570132942f
type SectorEntryParts = [
    id: string,
    sector: string,
    name: string,
    intName: string,
    list: string,
    fname: string,
    guid: string,
];
export class SectorEntry {
    private readonly _parts: SectorEntryParts;

    public constructor(parts: SectorEntryParts) {
        this._parts = parts;
    }

    public get key(): string {
        return `${this._parts[0]}*${this._parts[1]}`;
    }

    public get id(): number {
        return +this._parts[0];
    }

    public get sector(): string {
        return this._parts[1];
    }

    public get name(): string {
        return this._parts[2];
    }

    public get intName(): string {
        return this._parts[3];
    }

    public get list(): number {
        return +this._parts[4];
    }

    public get filename(): string {
        // eslint-disable-next-line @typescript-eslint/no-useless-template-literals
        return `${this._parts[5]}`.split(';', 2)[0]!;
    }

    public get externalID(): string {
        return this._parts[6];
    }

    public get meta(): Record<string, string> {
        const meta: Record<string, string> = {};
        // eslint-disable-next-line @typescript-eslint/no-useless-template-literals
        const [, ...parts] = `${this._parts[5]}`.split(';');
        parts.forEach((item: string) => {
            const [key, value] = item.split('=', 2).map((s) => s.trim());
            meta[key!] = value!;
        });

        return meta;
    }
}

// ans_type = 193
// result_code = -2: wrong guid
export class QuerySectorStatus extends Response {
    private readonly _list: SectorEntry[] = [];

    public constructor(r: RawResponse) {
        super(r);

        if (this.isSucceeded() && r.data.fotos.length > 0 && typeof r.data.fotos[0]!.foto === 'string') {
            this._decodeList(r.data.fotos[0]!.foto);
        }
    }

    private _decodeList(encoded: string): void {
        const s = Buffer.from(encoded, 'base64').toString('binary');
        const decoded = s.split(/[\r\n]+/gu).filter(Boolean);
        for (const item of decoded) {
            const parts = item.split('*', 7);
            if (parts.length === 7) {
                this._list.push(new SectorEntry(parts as SectorEntryParts));
            }
        }
    }

    public override isError(): boolean {
        return this.resultCode < 0;
    }

    public isAccepted(): boolean {
        return this.resultCode === 1;
    }

    public isPending(): boolean {
        return this.resultCode === 2;
    }

    public isSucceeded(): boolean {
        return this.resultCode === 3;
    }

    public cacheable(): boolean {
        return this.isSucceeded() || this.isError();
    }

    public get entries(): SectorEntry[] {
        return this._list;
    }
}
