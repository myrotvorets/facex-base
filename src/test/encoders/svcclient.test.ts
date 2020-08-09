import { SvcClientRequestEncoder } from '../../encoders/svcclient';
import { fakeRequest } from '../fakerequest';

describe('SvcClientRequestEncoder', () => {
    const encoder = new SvcClientRequestEncoder();

    it('should properly encode the request (chunked encoding)', () => {
        const expected = `233\r\n{"req_type":0,"signature":"","data":{"client_id":"","reqID_clnt":"","reqID_serv":"00000000-0000-0000-0000-000000000000","datetime":"0000-00-00T00:00:00.000Z","segment":"0","foto":null,"ResultNumber":0,"par1":0,"par2":0,"comment":""}}\r\n0\r\n\r\n`;
        return expect(encoder.encode(fakeRequest)).resolves.toBe(expected);
    });
});
