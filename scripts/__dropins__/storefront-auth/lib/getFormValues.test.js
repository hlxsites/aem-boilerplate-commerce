import { getFormValues } from '@/auth/lib/getFormValues';
const setGlobalFormData = (fakeFormData) => {
    // @ts-ignore
    global.FormData = function () {
        return fakeFormData;
    };
};
describe('[AUTH-LIB] - getFormValues', () => {
    test('returns null for undefined form', () => {
        const result = getFormValues(undefined);
        expect(result).toBeNull();
    });
    test('returns empty object for form without inputs', () => {
        const form = document.createElement('form');
        const result = getFormValues(form);
        expect(result).toEqual({});
    });
    test('correctly parses form with inputs', () => {
        const form = document.createElement('form');
        const inputName = document.createElement('input');
        inputName.setAttribute('name', 'name');
        inputName.value = 'John Doe';
        form.appendChild(inputName);
        const inputEmail = document.createElement('input');
        inputEmail.setAttribute('name', 'email');
        inputEmail.value = 'john@example.com';
        form.appendChild(inputEmail);
        const result = getFormValues(form);
        expect(result).toEqual({
            name: 'John Doe',
            email: 'john@example.com',
        });
    });
    test('handles form with complex structured names', () => {
        const form = document.createElement('form');
        const inputAddressStreet = document.createElement('input');
        inputAddressStreet.setAttribute('name', 'address[street]');
        inputAddressStreet.value = '123 Example St';
        form.appendChild(inputAddressStreet);
        const inputAddressCity = document.createElement('input');
        inputAddressCity.setAttribute('name', 'address[city]');
        inputAddressCity.value = 'Exampletown';
        form.appendChild(inputAddressCity);
        const result = getFormValues(form);
        expect(result).toEqual({
            'address[street]': '123 Example St',
            'address[city]': 'Exampletown',
        });
    });
    test('handles formData.entries not being a function', () => {
        const form = document.createElement('form');
        const fakeFormData = {
            entries: null,
        };
        const originalFormData = global.FormData;
        setGlobalFormData(fakeFormData);
        const result = getFormValues(form);
        global.FormData = originalFormData;
        expect(result).toEqual({});
    });
    test('handles formData.entries returning null', () => {
        const form = document.createElement('form');
        const fakeFormData = {
            entries: () => null,
        };
        const originalFormData = global.FormData;
        setGlobalFormData(fakeFormData);
        const result = getFormValues(form);
        global.FormData = originalFormData;
        expect(result).toEqual({});
    });
    test('handles formData.entries returning non-iterable', () => {
        const form = document.createElement('form');
        const fakeFormData = {
            entries: () => ({}),
        };
        const originalFormData = global.FormData;
        setGlobalFormData(fakeFormData);
        const result = getFormValues(form);
        global.FormData = originalFormData;
        expect(result).toEqual({});
    });
});
