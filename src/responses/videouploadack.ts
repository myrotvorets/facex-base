import { Response } from './response';

// ans_type = 241
export class VideoUploadAck extends Response {
    public isError(): boolean {
        return this.resultCode < 0;
    }
}
