import { Response } from './response';

// ans_type = 229
export class MatchedFacesError extends Response {
    public override isError(): boolean {
        return true;
    }
}
