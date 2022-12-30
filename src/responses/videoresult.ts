import { PhotoEntry, Response } from './response';

export class VideoMatch {
    private readonly _e: PhotoEntry;

    public constructor(x: PhotoEntry) {
        this._e = x;
    }

    public get archive(): string {
        return this._e.foto as string;
    }

    public get archiveAsBuffer(): Buffer {
        return Buffer.from(this._e.foto as string, 'base64');
    }

    public get filename(): string {
        return this._e.namef || '';
    }
}

// ans_type = 245
export class VideoResult extends Response {
    private _idx = 0;

    // eslint-disable-next-line class-methods-use-this
    public isCacheable(): boolean {
        return true;
    }

    public [Symbol.iterator](): Iterator<VideoMatch, undefined> {
        return {
            next: (): IteratorResult<VideoMatch, undefined> => {
                if (this._idx < this._raw.data.fotos.length) {
                    return {
                        value: new VideoMatch(this._raw.data.fotos[this._idx++]),
                        done: false,
                    };
                }

                this._idx = 0;
                return { value: undefined, done: true };
            },
        };
    }
}
