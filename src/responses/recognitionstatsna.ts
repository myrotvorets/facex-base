import { Response } from './response';

// ans_type = 228
export class RecognitionStatsNotAvailable extends Response {
    public override isError(): boolean {
        return true;
    }
}
