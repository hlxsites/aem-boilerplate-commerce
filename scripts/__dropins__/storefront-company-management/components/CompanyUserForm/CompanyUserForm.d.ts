import { FunctionComponent } from 'preact';
import { CompanyUserFormProps } from '../../types/companyForm.types';

/**
 * CompanyUserForm component for creating and editing company users
 * Provides form fields for user information including name, email, role, and status
 *
 * @param mode - Whether this is an 'add' or 'edit' operation
 * @param entityId - ID of the user being edited (for edit mode)
 * @param parentStructureId - ID of the parent structure node
 * @param permissions - User permissions for editing users
 * @param onSaved - Callback when user is successfully saved
 * @param onCancel - Callback when form is cancelled
 */
export declare const CompanyUserForm: FunctionComponent<CompanyUserFormProps>;
export default CompanyUserForm;
//# sourceMappingURL=CompanyUserForm.d.ts.map