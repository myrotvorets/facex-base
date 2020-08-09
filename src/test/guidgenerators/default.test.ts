import { DefaultGuidGenerator } from '../../guidgenerators/default';

describe('DefaultGuidGenerator', () => {
    const generator = new DefaultGuidGenerator();
    it('should generate v4 GUIDs', async () => {
        const iterations = 100;
        expect.assertions(iterations * 2);

        for (let i = 0; i < iterations; ++i) {
            const guid = await generator.generate();
            const version = guid.substring(12 + 2, 13 + 2);
            const variant = guid.substring(16 + 3, 17 + 3);

            expect(version).toBe('4');
            expect(parseInt(variant, 16) & 0x0c).toBe(0x08);
        }
    });
});
