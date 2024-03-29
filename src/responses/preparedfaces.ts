import { type PhotoEntry, Response } from './response';

export class PreparedFace {
    private readonly _e: PhotoEntry;

    public constructor(x: PhotoEntry) {
        this._e = x;
    }

    public get index(): number {
        return this._e.par1;
    }

    public get intName(): string {
        return this._e.namef ?? '';
    }

    public get origName(): string {
        return this._e.namel ?? '';
    }

    public get face(): string {
        return this._e.foto ?? '';
    }

    public get faceAsBuffer(): Buffer {
        return Buffer.from(this._e.foto ?? '', 'base64');
    }
}

// ans_type = 206
export class PreparedFaces extends Response {
    private _idx = 0;

    public isSucceeded(): boolean {
        return this.resultCode === 3;
    }

    public override isError(): boolean {
        return this.resultCode < 0;
    }

    public numberOfCapturedFaces(): number {
        return this.resultsAmount;
    }

    public [Symbol.iterator](): Iterator<PreparedFace, undefined> {
        return {
            next: (): IteratorResult<PreparedFace, undefined> => {
                if (this._idx < this._raw.data.fotos.length) {
                    return {
                        value: new PreparedFace(this._raw.data.fotos[this._idx++]!),
                        done: false,
                    };
                }

                this._idx = 0;
                return { value: undefined, done: true };
            },
        };
    }
}
