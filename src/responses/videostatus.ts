import { Response } from './response';

// ans_type = 243
export class VideoStatus extends Response {
    public isError(): boolean {
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
}
