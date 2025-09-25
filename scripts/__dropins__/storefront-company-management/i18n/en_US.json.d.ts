declare const _default: {
  "Company": {
    "shared": {
      "fields": {
        "companyName": "Company Name",
        "email": "Email",
        "legalName": "Legal Name",
        "vatTaxId": "VAT/Tax ID",
        "resellerId": "Reseller ID",
        "legalAddress": "Legal Address",
        "streetAddress": "Street Address",
        "city": "City",
        "country": "Country",
        "stateProvince": "State/Province",
        "zipPostalCode": "ZIP/Postal Code",
        "phoneNumber": "Phone Number",
        "status": "Status",
        "region": "Region",
        "postalCode": "Postal Code"
      },
      "buttons": {
        "edit": "Edit",
        "cancel": "Cancel",
        "save": "Save Changes",
        "saving": "Saving...",
        "close": "Close",
        "confirm": "Confirm"
      },
      "validation": {
        "required": "This field is required",
        "invalidEmail": "Please enter a valid email address",
        "companyNameRequired": "Company name is required",
        "emailRequired": "Email is required",
        "emailNotAvailable": "This email is already used by another company",
        "phoneInvalid": "Please enter a valid phone number",
        "postalCodeInvalid": "Please enter a valid postal code",
        "companyNameLengthError": "Company name must not exceed 40 characters",
        "legalNameLengthError": "Legal name must not exceed 80 characters",
        "vatTaxIdLengthError": "VAT/Tax ID must not exceed 40 characters",
        "resellerIdLengthError": "Reseller ID must not exceed 40 characters"
      },
      "messages": {
        "loading": "Loading...",
        "noData": "No data available",
        "error": "An error occurred",
        "success": "Operation completed successfully"
      },
      "ariaLabels": {
        "editButton": "Edit company profile",
        "cancelButton": "Cancel editing",
        "saveButton": "Save company profile changes",
        "closeButton": "Close dialog"
      }
    },
    "CompanyProfile": {
      "containerTitle": "Company Profile",
      "editCompanyProfile": {
        "containerTitle": "Edit Company Profile",
        "companySuccess": "Company profile updated successfully",
        "companyError": "Failed to update company profile",
        "buttonSecondary": "Cancel",
        "buttonPrimary": "Save Changes"
      },
      "companyProfileCard": {
        "noDataMessage": "Company profile not available. Please contact your administrator.",
        "contacts": "Contacts",
        "companyAdministrator": "Company Administrator",
        "salesRepresentative": "Sales Representative",
        "paymentInformation": "Payment Information",
        "availablePaymentMethods": "Available Payment Methods",
        "shippingInformation": "Shipping Information",
        "availableShippingMethods": "Available Shipping Methods",
        "noPaymentMethods": "This company has no payment methods. Please contact store administrator.",
        "noShippingMethods": "This company has no shipping methods. Please contact store administrator.",
        "companyDetails": "Company Details",
        "addressInformation": "Address Information"
      },
      "messages": {
        "loadError": "Failed to load company profile",
        "updateError": "Failed to update company profile",
        "loadingProfile": "Loading company profile...",
        "savingProfile": "Saving company profile..."
      }
    },
    "CompanyUsers": {
      "filters": {
        "showAll": "Show All Users",
        "showActive": "Show Active Users",
        "showInactive": "Show Inactive Users"
      },
      "columns": {
        "id": "ID",
        "name": "Name",
        "email": "Email",
        "role": "Role",
        "team": "Team",
        "status": "Status",
        "actions": "Actions"
      },
      "status": {
        "active": "Active",
        "inactive": "Inactive"
      },
      "emptyTeam": "-",
      "pagination": {
        "itemsCount": "{count} Item(s)",
        "itemsPerPage": "Items per page:",
        "show": "Show",
        "perPage": "per page",
        "previous": "Previous",
        "next": "Next",
        "pageInfo": "Page {current} of {total}"
      },
      "emptyActions": "",
      "actions": {
        "manage": "Manage"
      },
      "ariaLabels": {
        "loadingUsers": "Loading company users",
        "usersTable": "Company users table",
        "filterOptions": "User filter options",
        "paginationNav": "Pagination navigation",
        "pageNavigation": "Page navigation",
        "pageSizeSelector": "Items per page selector",
        "previousPageFull": "Go to previous page, current page {current}",
        "nextPageFull": "Go to next page, current page {current}",
        "currentPage": "Current page {current} of {total}",
        "showingUsers": "Showing {count} users",
        "dataLoaded": "Loaded {count} users",
        "dataError": "Failed to load users.",
        "manageUser": "Manage user {name}"
      },
      "managementModal": {
        "title": "Manage user",
        "setActiveText": "Reactivate the user's account by selecting \"Set as Active\".",
        "setInactiveText": "Temporarily lock the user's account by selecting \"Set as Inactive\".",
        "deleteText": "Permanently delete the user's account and all associated content by selecting \"Delete\". This action cannot be reverted.",
        "setActiveButton": "Set as Active",
        "setInactiveButton": "Set as Inactive",
        "settingActiveButton": "Setting Active...",
        "settingInactiveButton": "Setting Inactive...",
        "deleteButton": "Delete",
        "deletingButton": "Deleting...",
        "cancelButton": "Cancel",
        "setActiveErrorGeneric": "An unexpected error occurred while setting user as active.",
        "setActiveErrorSpecific": "Failed to set user as active.",
        "setInactiveErrorGeneric": "An unexpected error occurred while setting user as inactive.",
        "setInactiveErrorSpecific": "Failed to set user as inactive.",
        "deleteErrorGeneric": "An unexpected error occurred.",
        "deleteErrorSpecific": "Failed to delete user.",
        "ariaLabels": {
          "closeModal": "Close modal",
          "modalDescription": "User management options including setting as inactive or deleting the user account"
        }
      }
    },
    "FormText": {
      "requiredFieldError": "This is a required field.",
      "numericError": "Only numeric values are allowed.",
      "alphaNumWithSpacesError": "Only alphanumeric characters and spaces are allowed.",
      "alphaNumericError": "Only alphanumeric characters are allowed.",
      "alphaError": "Only alphabetic characters are allowed.",
      "emailError": "Please enter a valid email address.",
      "phoneError": "Please enter a valid phone number.",
      "postalCodeError": "Please enter a valid postal code.",
      "lengthTextError": "Text length must be between {min} and {max} characters.",
      "companyNameLengthError": "Company name must be between {min} and {max} characters."
    }
  }
};

export default _default;
