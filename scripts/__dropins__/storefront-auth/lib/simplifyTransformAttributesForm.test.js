import { simplifyTransformAttributesForm } from '@/auth/lib/simplifyTransformAttributesForm';
describe('[AUTH-LIB] - simplifyTransformAttributesForm', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('should return an empty array if fields is null or undefined', () => {
        expect(simplifyTransformAttributesForm(null)).toEqual([]);
        expect(simplifyTransformAttributesForm(undefined)).toEqual([]);
    });
    test('should return an empty array if fields is an empty array', () => {
        expect(simplifyTransformAttributesForm([])).toEqual([]);
    });
});
