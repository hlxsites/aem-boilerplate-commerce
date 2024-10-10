import { Form } from '@/auth/components/Form';
import { FormInputs } from '@/auth/components/Form/FormInputs';
import { Button } from '@adobe/elsie/components';
import { FieldEnumList } from '@/auth/data/models';
export default {
    title: 'Components/Form',
    component: Form,
    parameters: {
        layout: 'fullscreen', // centered | fullscreen
    },
    args: {
        name: 'formName',
        loading: false,
        className: 'defaultForm',
        fieldsConfig: [],
        forwardFormRef: null,
    },
    argTypes: {
        forwardFormRef: {
            control: 'object',
            description: 'It allows retrieving data from the form and triggering validation.',
        },
        name: {
            control: 'text',
            description: 'Unique name for the form.',
        },
        loading: {
            control: 'boolean',
            description: 'Indicates if the form is loading.',
        },
        className: {
            control: 'text',
            description: 'CSS class for form styling.',
        },
        fieldsConfig: {
            control: 'array',
            description: 'Configuration for form fields.',
        },
        onSubmit: {
            action: 'clicked',
            defaultValue: () => {
                console.info('onSubmit');
            },
            description: 'Function called when the form is submitted. Use this to handle form submission events, such as sending data to a server.',
        },
    },
};
const mockFields = [
    {
        id: 'firstName',
        default_value: '',
        entity_type: 'CUSTOMER',
        className: '',
        fieldType: 'TEXT',
        label: 'First Name',
        options: [],
    },
    {
        id: 'lastName',
        default_value: '',
        entity_type: 'CUSTOMER',
        className: '',
        fieldType: 'TEXT',
        label: 'Last Name',
        options: [],
    },
    { fieldType: 'BOOLEAN', id: 'acceptTerms', label: 'Accept Terms' },
    {
        fieldType: 'TEXTAREA',
        id: 'bio',
        label: 'Biography',
        className: '',
    },
];
const Template = {
    render: (args) => (<div style={{ margin: '40px auto', maxWidth: '1200px' }}>
      <Form {...args}>
        <FormInputs fields={mockFields} errors={{}} values={{}} className={'custom-form-class'}/>
        <Button type="submit" variant="primary" style={{ marginRight: 'auto' }} disabled={args.loading}>
          Create account
        </Button>
      </Form>
    </div>),
};
export const DefaultForm = {
    ...Template,
    args: {
        fieldsConfig: [
            {
                id: 'company',
                className: '',
                fieldType: FieldEnumList.TEXT,
                label: 'Company',
                options: [],
                orderNumber: 30,
                customUpperCode: 'TEST',
                validateRules: [],
            },
        ],
    },
};
