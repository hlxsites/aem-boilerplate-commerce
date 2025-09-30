/*! Copyright 2025 Adobe
All Rights Reserved. */
import { t, u } from "./jsxRuntime.module.js";
import { useState } from "@dropins/tools/preact-hooks.js";
import { ProgressSpinner, InLineAlert, Field, Input, TextArea, Button } from "@dropins/tools/components.js";
import { classes } from "@dropins/tools/lib.js";
import { useText } from "@dropins/tools/i18n.js";
import { R as REQUISITION_LIST_FRAGMENT, f as fetchGraphQl, h as handleFetchError, t as transformRequisitionList } from "./transform-requisition-list.js";
var _jsxFileName$1 = "/Users/rafaljanicki/www/storefront-requisition-list/src/components/RequisitionListForm/RequisitionListForm.tsx";
const RequisitionListForm$1 = ({
  className,
  mode,
  defaultValues = {
    name: "",
    description: ""
  },
  error = null,
  onSubmit,
  onCancel,
  ...props
}) => {
  const [values, setValues] = t(useState(defaultValues), "values");
  const [nameBlurred, setNameBlurred] = t(useState(false), "nameBlurred");
  const [isSubmitting, setIsSubmitting] = t(useState(false), "isSubmitting");
  const translations = useText({
    actionCancel: `RequisitionList.RequisitionListForm.actionCancel`,
    actionSave: `RequisitionList.RequisitionListForm.actionSave`,
    requiredField: `RequisitionList.RequisitionListForm.requiredField`,
    floatingLabel: `RequisitionList.RequisitionListForm.floatingLabel`,
    placeholder: `RequisitionList.RequisitionListForm.placeholder`,
    label: `RequisitionList.RequisitionListForm.label`,
    editTitle: `RequisitionList.RequisitionListForm.editTitle`,
    createTitle: `RequisitionList.RequisitionListForm.createTitle`
  });
  const handleChange = (field) => (e) => {
    const target = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [field]: target.value
    }));
  };
  const handleSubmit = async (e) => {
    var _a;
    e.preventDefault();
    if (!values.name || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onSubmit({
        name: values.name.trim(),
        description: ((_a = values.description) == null ? void 0 : _a.trim()) || void 0
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleNameBlur = () => setNameBlurred(true);
  const errorMessage = nameBlurred && !values.name.trim() ? translations.requiredField : "";
  const title = mode === "edit" ? translations.editTitle : translations.createTitle;
  return u("div", {
    ...props,
    className: classes(["requisition-list-form", className]),
    children: [u("div", {
      className: "requisition-list-form__title",
      children: [title, isSubmitting ? u("div", {
        className: classes(["requisition-list-form_progress-spinner", className]),
        "data-testid": "requisition-list-form-progress-spinner",
        children: u(ProgressSpinner, {
          stroke: "4",
          size: "small"
        }, void 0, false, {
          fileName: _jsxFileName$1,
          lineNumber: 118,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName$1,
        lineNumber: 111,
        columnNumber: 11
      }, void 0) : null]
    }, void 0, true, {
      fileName: _jsxFileName$1,
      lineNumber: 108,
      columnNumber: 7
    }, void 0), error ? u(InLineAlert, {
      type: "error",
      className: "requisition-list-form__notification",
      variant: "secondary",
      heading: error,
      "data-testid": "requisition-list-alert"
    }, void 0, false, {
      fileName: _jsxFileName$1,
      lineNumber: 124,
      columnNumber: 9
    }, void 0) : null, u("form", {
      className: classes(["requisition-list-form__form", className]),
      onSubmit: handleSubmit,
      children: [u(Field, {
        error: errorMessage,
        disabled: isSubmitting,
        children: u(Input, {
          id: "requisition-list-form-name",
          name: "name",
          type: "text",
          floatingLabel: translations.floatingLabel,
          placeholder: translations.placeholder,
          required: true,
          value: values.name,
          onChange: handleChange("name"),
          onBlur: handleNameBlur
        }, void 0, false, {
          fileName: _jsxFileName$1,
          lineNumber: 138,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName$1,
        lineNumber: 137,
        columnNumber: 9
      }, void 0), u(Field, {
        disabled: isSubmitting,
        children: u(TextArea, {
          id: "requisition-list-form-description",
          name: "description",
          label: translations.label,
          placeholder: translations.label,
          value: values.description,
          onChange: handleChange("description")
        }, void 0, false, {
          fileName: _jsxFileName$1,
          lineNumber: 152,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName$1,
        lineNumber: 151,
        columnNumber: 9
      }, void 0), u("div", {
        className: "requisition-list-form__actions",
        children: [u(Button, {
          type: "button",
          variant: "secondary",
          onClick: onCancel,
          disabled: isSubmitting,
          "data-testid": "requisition-list-form-cancel",
          children: translations.actionCancel
        }, void 0, false, {
          fileName: _jsxFileName$1,
          lineNumber: 163,
          columnNumber: 11
        }, void 0), u(Button, {
          type: "submit",
          disabled: isSubmitting,
          "data-testid": "requisition-list-form-save",
          children: translations.actionSave
        }, void 0, false, {
          fileName: _jsxFileName$1,
          lineNumber: 172,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName$1,
        lineNumber: 162,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName$1,
      lineNumber: 133,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName$1,
    lineNumber: 107,
    columnNumber: 5
  }, void 0);
};
const CREATE_REQUISITION_LIST_MUTATION = `
  mutation CREATE_REQUISITION_LIST_MUTATION(
      $requisitionListName: String!,
      $requisitionListDescription: String,
    ) {
    createRequisitionList(
      input: {
        name: $requisitionListName
        description: $requisitionListDescription
      }
    ) {
      requisition_list {
        ...REQUISITION_LIST_FRAGMENT
      }
    }
  }
${REQUISITION_LIST_FRAGMENT}
`;
const createRequisitionList = async (name, description) => {
  return fetchGraphQl(CREATE_REQUISITION_LIST_MUTATION, {
    variables: {
      requisitionListName: name,
      requisitionListDescription: description
    }
  }).then(({
    errors,
    data
  }) => {
    if (errors) return handleFetchError(errors);
    return transformRequisitionList(data.createRequisitionList.requisition_list);
  });
};
const UPDATE_REQUISITION_LIST_MUTATION = `
  mutation UPDATE_REQUISITION_LIST_MUTATION(
      $requisitionListUid: ID!,
      $name: String!, 
      $description: String,
    ) {
    updateRequisitionList(
      requisitionListUid: $requisitionListUid
      input: {
        name: $name
        description: $description
      }
    ) {
      requisition_list {
        ...REQUISITION_LIST_FRAGMENT
      }
    }
  }
${REQUISITION_LIST_FRAGMENT}
`;
const updateRequisitionList = async (requisitionListUid, name, description) => {
  return fetchGraphQl(UPDATE_REQUISITION_LIST_MUTATION, {
    variables: {
      requisitionListUid,
      name,
      description
    }
  }).then(({
    errors,
    data
  }) => {
    if (errors) return handleFetchError(errors);
    return transformRequisitionList(data.updateRequisitionList.requisition_list);
  });
};
function useRequisitionListForm(mode, requisitionListUid, onSuccess, onError) {
  const [error, setError] = t(useState(null), "error");
  const submit = async (values) => {
    setError(null);
    try {
      const result = mode === "edit" && requisitionListUid ? await updateRequisitionList(requisitionListUid, values.name, values.description) : await createRequisitionList(values.name, values.description);
      if (result) onSuccess == null ? void 0 : onSuccess(result);
      return result;
    } catch (e) {
      const msg = (e == null ? void 0 : e.message) || "Unexpected error";
      setError(msg);
      onError == null ? void 0 : onError(msg);
      return null;
    }
  };
  return {
    error,
    submit
  };
}
var _jsxFileName = "/Users/rafaljanicki/www/storefront-requisition-list/src/containers/RequisitionListForm/RequisitionListForm.tsx";
const RequisitionListForm = ({
  mode,
  requisitionListUid,
  defaultValues = {
    name: "",
    description: ""
  },
  onSuccess,
  onError,
  onCancel
}) => {
  const {
    error,
    submit
  } = useRequisitionListForm(mode, requisitionListUid, onSuccess, onError);
  const handleSubmit = async (values) => {
    await submit(values);
  };
  return u(RequisitionListForm$1, {
    mode,
    defaultValues,
    error,
    onSubmit: handleSubmit,
    onCancel
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 56,
    columnNumber: 5
  }, void 0);
};
export {
  RequisitionListForm as R
};
//# sourceMappingURL=RequisitionListForm.js.map
