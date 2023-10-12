import { type PhotoEntry, Response } from './response';

export class StoredFace {
    private readonly _e: PhotoEntry;

    public constructor(x: PhotoEntry) {
        this._e = x;
    }

    public get id(): number {
        return this._e.par1;
    }

    public get list(): number {
        return this._e.par2;
    }

    public get externalID(): string {
        return `${this._e.par3}`;
    }

    public get face(): string {
        return typeof this._e.foto === 'string' ? this._e.foto : '';
    }

    public get faceAsBuffer(): Buffer {
        return Buffer.from(this._e.foto ?? '', 'base64');
    }

    public get intName(): string {
        // Example: 1-0
        return typeof this._e.namef === 'string' ? this._e.namef : '';
    }

    public get name(): string {
        // Example: !1-0-975495-975510
        return typeof this._e.namel === 'string' ? this._e.namel : '';
    }

    public get path(): string {
        if (typeof this._e.path === 'string') {
            const parts = this._e.path.split(';', 2);
            return parts[0]!;
        }

        return '';
    }

    public get meta(): Record<string, string> {
        const meta: Record<string, string> = {};
        if (typeof this._e.path === 'string') {
            const [, ...parts] = this._e.path.split(';');
            parts.forEach((item: string) => {
                const [key, value] = item.split('=', 2).map((s) => s.trim());
                meta[key!] = value!;
            });
        }

        return meta;
    }
}

// ans_type = 194
export class QuerySectorResult extends Response {
    private _idx = 0;

    public override isCacheable(): boolean {
        return true;
    }

    public [Symbol.iterator](): Iterator<StoredFace> {
        return {
            next: (): IteratorResult<StoredFace> => {
                if (this._idx < this._raw.data.fotos.length) {
                    return {
                        value: new StoredFace(this._raw.data.fotos[this._idx++]!),
                        done: false,
                    };
                }

                this._idx = 0;
                return { value: undefined as unknown as StoredFace, done: true };
            },
        };
    }
}
