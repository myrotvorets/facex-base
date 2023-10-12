import { Response } from './response';

// ans_type = 66
export class SearchFailed extends Response {
    public override isError(): boolean {
        return true;
    }
}
