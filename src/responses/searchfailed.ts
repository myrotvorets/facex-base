import { Response } from './response';

// ans_type = 66
export class SearchFailed extends Response {
    // eslint-disable-next-line class-methods-use-this
    public isError(): boolean {
        return true;
    }
}
