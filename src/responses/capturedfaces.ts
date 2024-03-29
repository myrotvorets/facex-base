import { type PhotoEntry, Response } from './response';

export class CapturedFace {
    private readonly _e: PhotoEntry;

    public constructor(x: PhotoEntry) {
        this._e = x;
    }

    public get faceID(): number {
        return this._e.par1;
    }

    public get minSimilarity(): number {
        return this._e.par2;
    }

    public get maxSimilarity(): number {
        return +this._e.par3;
    }

    public get similarityRange(): [number, number] {
        return [this._e.par2, +this._e.par3];
    }

    public get face(): string {
        return this._e.foto!;
    }

    public get faceAsBuffer(): Buffer {
        return Buffer.from(this._e.foto!, 'base64');
    }
}

// ans_type = 80
export class CapturedFaces extends Response {
    private _idx = 0;

    public override isCacheable(): boolean {
        return true;
    }

    public [Symbol.iterator](): Iterator<CapturedFace, undefined> {
        return {
            next: (): IteratorResult<CapturedFace, undefined> => {
                if (this._idx < this._raw.data.fotos.length) {
                    return {
                        value: new CapturedFace(this._raw.data.fotos[this._idx++]!),
                        done: false,
                    };
                }

                this._idx = 0;
                return { value: undefined, done: true };
            },
        };
    }
}
