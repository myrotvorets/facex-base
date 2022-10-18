import * as Response from './responses';

const lookupTable: Record<number, typeof Response.Response> = {
    8: Response.BaseStatus,

    16: Response.StartCompareAck,
    17: Response.UploadCompareAck,
    18: Response.CompareCompleted,

    33: Response.SearchUploadAck,
    34: Response.SearchUploadError,

    65: Response.SearchInProgress,
    66: Response.SearchFailed,
    67: Response.SearchCompleted,

    80: Response.CapturedFaces,
    // getCapturedFaces() while search is still in progress
    85: Response.SearchInProgress,
    // Wrong GUID passed to getCapturedFaces()
    87: Response.CapturedFacesError,

    128: Response.RecognitionStats,
    // getRecognitionStats() while search is still in progress or if GUID is bad
    228: Response.RecognitionStatsNotAvailable,

    129: Response.MatchedFaces,
    // getMatchedFaces() while search is still in progress or if GUID is bad
    229: Response.MatchedFacesError,

    192: Response.QuerySectorAck,
    193: Response.QuerySectorStatus,
    194: Response.QuerySectorResult,

    200: Response.QuerySectorStatsAck,
    201: Response.QuerySectorStatsResult,

    204: Response.PrepareAddAck,
    205: Response.PrepareAddStatus,
    206: Response.PreparedFaces,
    207: Response.AddPreparedFacesAck,

    208: Response.DeleteAck,
    209: Response.DeleteStatus,

    241: Response.VideoUploadAck,
    243: Response.VideoStatus,
    245: Response.VideoResult,
};

export function responseFactory(r: Response.RawResponse): Response.Response {
    const type = +r.ans_type;
    const ctor = lookupTable[type];

    return ctor ? new ctor(r) : new Response.Response(r);
}
