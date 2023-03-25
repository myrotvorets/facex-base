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
    // eslint-disable-next-line class-methods-use-this
    public isCacheable(): boolean {
        return true;
    }

    public isError(): boolean {
        return this.resultCode < 0;
    }

    public get archive(): VideoMatch | null {
        const { length } = this._raw.data.fotos;
        if (length === 0) {
            return null;
        }

        if (length > 1) {
            console.warn(`VideoResult: ${length} matches found, only one expected`);
        }

        return new VideoMatch(this._raw.data.fotos[0]);
    }
}
