import { useInLineAlert } from '@/auth/hooks/useInLineAlert';
import { act } from 'preact/test-utils';
import { renderHook } from '@testing-library/react-hooks';
describe('[AUTH-hooks] - useInLineAlert', () => {
    test('should initialize inLineAlertProps with empty status and text', () => {
        const { result } = renderHook(() => useInLineAlert());
        expect(result.current.inLineAlertProps.type).toBe(undefined);
        expect(result.current.inLineAlertProps.text).toBe(undefined);
    });
    test('should update inLineAlertProps when handleSetInLineAlertProps is called', () => {
        const { result } = renderHook(() => useInLineAlert());
        act(() => {
            result.current.handleSetInLineAlertProps({
                type: 'success',
                text: 'Update successful!',
            });
        });
        expect(result.current.inLineAlertProps.type).toBe('success');
        expect(result.current.inLineAlertProps.text).toBe('Update successful!');
    });
    test('should not update inLineAlertProps if argument is undefined', () => {
        const { result } = renderHook(() => useInLineAlert());
        act(() => {
            result.current.handleSetInLineAlertProps(undefined);
        });
        expect(result.current.inLineAlertProps.type).toBe(undefined);
        expect(result.current.inLineAlertProps.text).toBe(undefined);
    });
});
