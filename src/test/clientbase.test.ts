import { mocked } from 'jest-mock';
import { ClientRequestEncoder } from '../encoders/client';
import type { IRemoteTransport } from '../interfaces';
import { ClientBase } from '../clientbase';
import { FaceXRequestBuilder } from '../request/builder';
import { BadResponseError } from '../exceptions';
import { fakeRequest } from './fakerequest';

jest.mock('../request/builder');

const mockedRequestBuilder = FaceXRequestBuilder as jest.Mock<FaceXRequestBuilder>;

const mockRequestEncoder = jest.fn();
jest.mock('../encoders/client', () => {
    return {
        ClientRequestEncoder: jest.fn().mockImplementation(() => ({
            encode: mockRequestEncoder,
        })),
    };
});

const FakeTransport_post = jest.fn();

class FakeTransport implements IRemoteTransport {
    public post(url: URL, data: string, headers: Record<string, string>): Promise<string> {
        return FakeTransport_post(url, data, headers) as Promise<string>;
    }
}

describe('ClientBase', () => {
    beforeEach(() => jest.clearAllMocks());

    it('constructs request and handles response properly', async () => {
        const transport = new FakeTransport();
        const encoder = mocked<ClientRequestEncoder>(new ClientRequestEncoder(), { shallow: true });
        const builder = new mockedRequestBuilder();
        const client = new ClientBase('http://example.com/', transport, encoder, builder);

        mockRequestEncoder.mockResolvedValue('{}');
        FakeTransport_post.mockResolvedValue(
            `{"ans_type":67,"signature":"YZSv2w==","data":{"id":"x","client_id":"","reqID_serv":"ab6e9e51-e042-4fc2-afff-7f9ab1122f5b","reqID_clnt":"567ff2b0-ea23-47ca-bfd2-f990c73c3e1b","segment":"0","datetime":"6/13/2020 7:27:06 PM","result_code":3,"results_amount":1,"comment":"result ready","fotos":[{"par1":2588,"par2":0,"par3":53,"foto":null,"namef":null,"namel":null,"path":null}]}}`,
        );

        expect.assertions(4);

        await client.rawRequest(fakeRequest);
        expect(mockRequestEncoder).toHaveBeenCalledTimes(1);
        expect(mockRequestEncoder).toHaveBeenCalledWith(fakeRequest);
        expect(FakeTransport_post).toHaveBeenCalledTimes(1);
        expect(FakeTransport_post).toHaveBeenCalledWith(new URL('http://example.com/'), '{}', {
            'Content-Type': 'text/json',
            'Content-Length': '2',
        });
    });

    it('throws BadResponseError on bad JSON', () => {
        const transport = new FakeTransport();
        const encoder = mocked<ClientRequestEncoder>(new ClientRequestEncoder(), { shallow: true });
        const builder = new mockedRequestBuilder();
        const client = new ClientBase('http://example.com/', transport, encoder, builder);

        mockRequestEncoder.mockResolvedValue('{}');
        FakeTransport_post.mockResolvedValue(undefined);

        return expect(client.rawRequest(fakeRequest)).rejects.toThrow(BadResponseError);
    });
});
