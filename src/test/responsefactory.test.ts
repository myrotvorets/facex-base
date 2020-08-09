import { responseFactory } from '../responsefactory';

const data: [number, string][] = [
    [8, 'BaseStatus'],
    [16, 'StartCompareAck'],
    [17, 'UploadCompareAck'],
    [18, 'CompareCompleted'],
    [33, 'SearchUploadAck'],
    [34, 'SearchUploadError'],
    [65, 'SearchInProgress'],
    [66, 'SearchFailed'],
    [67, 'SearchCompleted'],
    [80, 'CapturedFaces'],
    [85, 'SearchInProgress'],
    [87, 'CapturedFacesError'],
    [128, 'RecognitionStats'],
    [228, 'RecognitionStatsNotAvailable'],
    [129, 'MatchedFaces'],
    [229, 'MatchedFacesError'],
    [192, 'QuerySectorAck'],
    [193, 'QuerySectorStatus'],
    [194, 'QuerySectorResult'],
    [200, 'QuerySectorStatsAck'],
    [201, 'QuerySectorStatsResult'],
    [204, 'PrepareAddAck'],
    [205, 'PrepareAddStatus'],
    [206, 'PreparedFaces'],
    [207, 'AddPreparedFacesAck'],
    [208, 'DeleteAck'],
    [209, 'DeleteStatus'],
];

const fakeResponse = {
    ans_type: 0,
    signature: '',
    data: {
        client_id: '',
        reqID_serv: '00000000-0000-0000-0000-000000000000',
        reqID_clnt: '00000000-0000-0000-0000-000000000000',
        datetime: '0000-00-00T00:00:00.000Z',
        result_code: 0,
        results_amount: 0,
        id: '',
        segment: '',
        fotos: [],
        comment: '',
    },
};

describe('responseFactory', () => {
    it('should return a generic response for unknown reponse types', () => {
        const actual = responseFactory(fakeResponse);
        expect(actual.constructor.name).toBe('Response');
    });

    it.each(data)('should return specific response for known response type (%d => %s)', (type, name) => {
        const response = Object.assign({}, fakeResponse, { ans_type: type });
        const actual = responseFactory(response);
        expect(actual.constructor.name).toBe(name);
    });
});
