import { Response } from './response';

// ans_type = 34
export class SearchUploadError extends Response {
    public override isError(): boolean {
        return true;
    }
}
