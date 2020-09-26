import { Response } from './response';

// ans_type = 228
export class RecognitionStatsNotAvailable extends Response {
    // eslint-disable-next-line class-methods-use-this
    public isError(): boolean {
        return true;
    }
}
