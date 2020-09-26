import { Response } from './response';

// ans_type = 87
export class CapturedFacesError extends Response {
    // eslint-disable-next-line class-methods-use-this
    public isError(): boolean {
        return true;
    }
}
