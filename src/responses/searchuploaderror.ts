import { Response } from './response';

// ans_type = 34
export class SearchUploadError extends Response {
    // eslint-disable-next-line class-methods-use-this
    public isError(): boolean {
        return true;
    }
}
