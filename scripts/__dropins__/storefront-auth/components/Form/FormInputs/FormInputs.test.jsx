import { FormInputs } from '@/auth/components/Form/FormInputs/FormInputs';
import { render, screen } from '@adobe/elsie/lib/tests';
import '@testing-library/jest-dom';
describe('[AUTH-Components] - FormInputs', () => {
    const onChange = jest.fn();
    const onBlur = jest.fn();
    afterEach(() => {
        jest.restoreAllMocks();
    });
    test('renders', () => {
        const { container } = render(<FormInputs />);
        expect(!!container).toEqual(true);
    });
    test('renders EmailField for email fieldType', () => {
        const fields = [
            {
                id: 'email',
                default_value: '',
                entity_type: 'CUSTOMER',
                className: '',
                fieldType: 'TEXT',
                label: 'Email',
                required: true,
                options: [],
            },
        ];
        render(<FormInputs fields={fields} className="test" onChange={onChange} onBlur={onBlur} values={undefined}/>);
        const emailField = screen.getByPlaceholderText('Email');
        expect(emailField).toHaveAttribute('placeholder', 'Email');
        expect(emailField.value).toBe('');
        expect(screen.getByText('Email *')).toBeInTheDocument();
    });
    test('renders SelectField for SELECT fieldType', () => {
        const fields = [
            {
                fieldType: 'SELECT',
                entity_type: 'CUSTOMER',
                id: 'country',
                label: 'Country',
                options: [{ value: 'us', label: 'Country', is_default: false }],
            },
        ];
        render(<FormInputs fields={fields}/>);
        expect(screen.getByLabelText('Country')).toBeInTheDocument();
    });
    test('renders CheckboxField for BOOLEAN fieldType', () => {
        const handleOnChange = jest.fn();
        const handleOnBlur = jest.fn();
        const fields = [
            {
                fieldType: 'BOOLEAN',
                id: 'acceptTerms',
                label: 'Accept Terms',
                required: false,
            },
        ];
        render(<FormInputs fields={fields} onChange={handleOnChange} onBlur={handleOnBlur}/>);
        expect(screen.getByText('Accept Terms')).toBeInTheDocument();
    });
    test('renders CheckboxField for BOOLEAN fieldType is required', () => {
        const handleOnChange = jest.fn();
        const handleOnBlur = jest.fn();
        const fields = [
            {
                fieldType: 'BOOLEAN',
                id: 'acceptTerms',
                label: 'Accept Terms',
                required: true,
            },
        ];
        render(<FormInputs fields={fields} onChange={handleOnChange} onBlur={handleOnBlur}/>);
        expect(screen.getByText('Accept Terms *')).toBeInTheDocument();
    });
    test('renders MULTILINE fieldType', () => {
        const fields = [
            {
                fieldType: 'MULTILINE',
                entity_type: 'CUSTOMER',
                id: 'street',
                label: 'Street',
                options: ['one', 'two'],
            },
        ];
        render(<FormInputs fields={fields}/>);
        expect(screen.getByLabelText('Street')).toBeInTheDocument();
    });
    test('replace input text => select if item have options list', () => {
        const fields = [
            {
                fieldType: 'TEXT',
                entity_type: 'CUSTOMER',
                id: 'country',
                label: 'Country',
                required: false,
                options: [{ value: 'us', label: 'Country', is_default: false }],
            },
        ];
        render(<FormInputs fields={fields}/>);
        expect(screen.getByLabelText('Country')).toBeInTheDocument();
    });
    test('should not render label if fieldType is empty or unknown', () => {
        const handleOnChange = jest.fn();
        const handleOnBlur = jest.fn();
        const fields = [{ fieldType: '', id: 'test', label: 'Accept Terms' }];
        render(<FormInputs fields={fields} onChange={handleOnChange} onBlur={handleOnBlur}/>);
        expect(screen.queryByText('Accept Terms')).not.toBeInTheDocument();
    });
    test('renders DATE fieldType required', () => {
        const fields = [
            {
                fieldType: 'DATE',
                entity_type: 'CUSTOMER',
                id: 'date',
                code: 'date',
                label: 'Date',
                name: 'date',
                required: true,
                defaultValue: '',
                options: [],
            },
        ];
        render(<FormInputs fields={fields}/>);
        expect(screen.getByLabelText('Date *')).toBeInTheDocument();
    });
    test('renders DATE fieldType not required', () => {
        const fields = [
            {
                fieldType: 'DATE',
                entity_type: 'CUSTOMER',
                id: 'date',
                code: 'date',
                label: 'Date',
                name: 'date',
                required: false,
                defaultValue: '',
                options: [],
            },
        ];
        render(<FormInputs fields={fields}/>);
        expect(screen.getByLabelText('Date')).toBeInTheDocument();
    });
    test('renders TEXTAREA fieldType not required', () => {
        const fields = [
            {
                fieldType: 'TEXTAREA',
                entity_type: 'CUSTOMER',
                id: 'textarea',
                code: 'textarea',
                label: 'Textarea',
                name: 'textarea',
                required: false,
                defaultValue: '',
                options: [],
            },
        ];
        render(<FormInputs fields={fields}/>);
        expect(screen.getByLabelText('Textarea')).toBeInTheDocument();
    });
    test('renders TEXTAREA fieldType required', () => {
        const fields = [
            {
                fieldType: 'TEXTAREA',
                entity_type: 'CUSTOMER',
                id: 'textarea',
                code: 'textarea',
                label: 'Textarea',
                name: 'textarea',
                required: true,
                defaultValue: '',
                options: [],
            },
        ];
        render(<FormInputs fields={fields} className="test" onChange={onChange} onBlur={onBlur} values={undefined}/>);
        expect(screen.getByText('Textarea *')).toBeInTheDocument();
    });
});
