import { HttpError } from '../exceptions';

describe('HttpError', () => {
    const template = { status: 500, statusText: 'Unknown error' };
    const error = new HttpError(template);

    it('should have empty body', () => {
        expect(error).toHaveProperty('body');
        expect(error.body).toEqual('');
    });

    it('should have correct status code', () => {
        expect(error).toHaveProperty('code');
        expect(error.code).toEqual(template.status);
    });

    it('should have correct status test', () => {
        expect(error).toHaveProperty('statusText');
        expect(error.statusText).toEqual(template.statusText);
    });

    it('should construct correct message', () => {
        expect(error.message).toBe(`HTTP Error ${template.status}`);
    });
});
