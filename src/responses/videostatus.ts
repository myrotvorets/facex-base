import { Response } from './response';

// ans_type = 243
export class VideoStatus extends Response {
    private _attributes: Record<string, string> | null = null;

    public override isError(): boolean {
        return this.resultCode < 0;
    }

    public isAccepted(): boolean {
        return this.resultCode === 1;
    }

    public isInProgress(): boolean {
        return this.resultCode === 2;
    }

    public isCompleted(): boolean {
        return this.resultCode === 3;
    }

    public description(): string {
        return this.comment;
    }

    public attributes(): Record<string, string> {
        if (this._attributes === null) {
            const attrs = Response.parseAttributes(this.comment);
            if (attrs[0]) {
                attrs['status'] = attrs[0];
                delete attrs[0];
            }

            this._attributes = attrs;
            Object.freeze(this._attributes);
        }

        return this._attributes;
    }
}
