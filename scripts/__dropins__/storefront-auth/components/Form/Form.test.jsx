import { render, screen } from '@adobe/elsie/lib/tests';
import '@testing-library/jest-dom';
import FormInputs from './FormInputs';
describe('[Account-components] - FormInputs', () => {
    test('renders SelectField for SELECT fieldType', () => {
        const fields = [
            {
                fieldType: 'SELECT',
                entityType: 'CUSTOMER',
                id: 'country',
                label: 'Country',
                options: [{ value: 'us', label: 'Country', is_default: false }],
            },
        ];
        render(<FormInputs fields={fields}/>);
        expect(screen.getByLabelText('Country')).toBeInTheDocument();
    });
    test('renders TEXTAREA fieldType not required', () => {
        const fields = [
            {
                fieldType: 'TEXTAREA',
                entityType: 'CUSTOMER',
                id: 'textarea',
                code: 'textarea',
                label: 'Textarea',
                name: 'textarea',
                required: true,
                defaultValue: '',
                options: [],
            },
        ];
        render(<FormInputs fields={fields}/>);
        expect(screen.getByLabelText('Textarea *')).toBeInTheDocument();
    });
});
