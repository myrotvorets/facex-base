import { Response } from './response';

// ans_type = 229
export class MatchedFacesError extends Response {
    // eslint-disable-next-line class-methods-use-this
    public isError(): boolean {
        return true;
    }
}
