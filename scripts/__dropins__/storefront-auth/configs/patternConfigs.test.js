import { EMAIL_PATTERN } from './patternConfigs';
describe('Email Pattern Test', () => {
    test('Valid email format should pass', () => {
        const validEmails = [
            'test@example.com',
            'test.email@example.com',
            'test_email@example.co.uk',
            'test.email123@example-domain.com',
        ];
        validEmails.forEach((email) => {
            expect(EMAIL_PATTERN.test(email)).toBe(true);
        });
    });
    test('Invalid email format should fail', () => {
        const invalidEmails = ['test', 'test@', 'test.com', '@example.com'];
        invalidEmails.forEach((email) => {
            expect(EMAIL_PATTERN.test(email)).toBe(false);
        });
    });
});
