import { ClientRequestEncoder } from '../../encoders/client';
import { fakeRequest } from '../fakerequest';

describe('ClientRequestEncoder', () => {
    const encoder = new ClientRequestEncoder();

    it('should properly encode the request', () => {
        const expected = `{"req_type":0,"signature":"","data":{"client_id":"","reqID_clnt":"","reqID_serv":"00000000-0000-0000-0000-000000000000","datetime":"0000-00-00T00:00:00.000Z","segment":"0","foto":null,"ResultNumber":0,"par1":0,"par2":0,"comment":""}}`;
        return expect(encoder.encode(fakeRequest)).resolves.toBe(expected);
    });
});
