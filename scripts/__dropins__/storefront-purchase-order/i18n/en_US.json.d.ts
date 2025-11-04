declare const _default: {
  "PurchaseOrders": {
    "customerPurchaseOrders": {
      "containerTitle": "My purchase orders",
      "noPurchaseOrders": "No purchase orders found."
    },
    "companyPurchaseOrders": {
      "containerTitle": "Company purchase orders",
      "noPurchaseOrders": "No company purchase orders found."
    },
    "requireApprovalPurchaseOrders": {
      "containerTitle": "Requires my approval",
      "noPurchaseOrders": "No purchase orders requiring my approval found."
    },
    "approvalRulesList": {
      "containerTitle": "Approval rules",
      "emptyTitle": "No approval rules found",
      "ariaLabel": {
        "editRule": "Edit approval rule {{ruleName}}",
        "deleteRule": "Delete approval rule {{ruleName}}",
        "viewRule": "View approval rule {{ruleName}}"
      },
      "buttons": {
        "newRule": "Add New Rule"
      }
    },
    "alertMessages": {
      "header": {
        "approve": "Approve Purchase Orders",
        "reject": "Reject Purchase Orders",
        "error": "Error"
      },
      "description": {
        "approve": "The selected purchase orders were approved successfully.",
        "reject": "The selected purchase orders were rejected successfully.",
        "error": "An error occurred while processing your request."
      }
    },
    "purchaseOrdersTable": {
      "noPurchaseOrders": {
        "default": "No purchase orders found."
      },
      "pagination": {
        "status": "Items {{from}} to {{to}} of {{total}} total",
        "pageSizeLabel": {
          "start": "Show",
          "end": "per page"
        }
      },
      "loading": "Loading purchase orders...",
      "actionView": "View",
      "actionEdit": "Edit",
      "actionDelete": "Delete",
      "rulesStatus": {
        "enabled": "Enabled",
        "disabled": "Disabled"
      },
      "ruleTypes": {
        "grand_total": "Grand Total",
        "number_of_skus": "Number of SKUs",
        "any_item": "Any Item",
        "all_items": "All Items"
      },
      "appliesToAll": "All",
      "statusOrder": {
        "order_placed": "Order placed",
        "order_failed": "Order failed",
        "pending": "Pending",
        "approved": "Approved",
        "rejected": "Rejected",
        "canceled": "Canceled",
        "order_in_progress": "Order in progress",
        "approval_required": "Approval required",
        "approved_pending_payment": "Approved pending Payment"
      },
      "tableColumns": {
        "poNumber": "PO #",
        "orderNumber": "Order #",
        "createdDate": "Created",
        "updatedDate": "Updated",
        "createdBy": "Created By",
        "status": "Status",
        "total": "Total",
        "action": "Action",
        "ruleName": "Rule Name",
        "ruleType": "Rule Type",
        "appliesTo": "Applies To",
        "approver": "Approver",
        "selectAllAriaLabel": "Select all not approved purchase orders"
      }
    },
    "purchaseOrderConfirmation": {
      "title": "Your Purchase Order has been submitted for approval.",
      "messagePrefix": "Your Purchase Order request number is",
      "messageSuffix": "A copy of this Purchase Order will be emailed to you shortly."
    },
    "purchaseOrderStatus": {
      "status": {
        "pending": {
          "title": "Pending Approval",
          "message": "Purchase order is awaiting approval."
        },
        "approval_required": {
          "title": "Approval Required",
          "message": "Purchase order requires approval before it can be processed."
        },
        "approved": {
          "title": "Approved",
          "message": "Purchase order has been approved."
        },
        "order_in_progress": {
          "title": "Processing in Progress",
          "message": "Purchase order is currently being processed."
        },
        "order_placed": {
          "title": "Placed",
          "message": "Purchase order has been placed successfully."
        },
        "order_failed": {
          "title": "Failed",
          "message": "Purchase order processing has failed."
        },
        "rejected": {
          "title": "Rejected",
          "message": "Purchase order has been rejected."
        },
        "canceled": {
          "title": "Canceled",
          "message": "Purchase order has been canceled."
        },
        "approved_pending_payment": {
          "title": "Approved - Pending Payment",
          "message": "Purchase order has been approved and is awaiting payment."
        }
      },
      "alertMessages": {
        "success": {
          "approval": "The purchase order was approved successfully.",
          "reject": "The purchase order was rejected successfully.",
          "cancel": "The purchase order was canceled successfully.",
          "placeOrder": "The sales order was placed successfully."
        },
        "errors": {
          "approval": "An error occurred while approving the purchase order. Please try again.",
          "reject": "An error occurred while rejecting the purchase order. Please try again.",
          "cancel": "An error occurred while canceling the purchase order. Please try again.",
          "placeOrder": "An error occurred while placing the sales order. Please try again."
        }
      },
      "buttons": {
        "approve": "Approve",
        "reject": "Reject",
        "cancel": "Cancel",
        "placeOrder": "Place Order"
      }
    },
    "approvalRuleForm": {
      "headerText": "Purchase Order Approval Rule",
      "titleAppliesTo": "Applies To",
      "titleRuleType": "Rule Type",
      "titleRequiresApprovalRole": "Requires Approval From",
      "fields": {
        "enabled": "Rule Enabled",
        "disabled": "Rule Disabled",
        "inputRuleName": {
          "floatingLabel": "Rule Name",
          "placeholder": "Rule Name"
        },
        "textAreaDescription": {
          "label": "Rule Description"
        },
        "appliesTo": {
          "allUsers": "All Users",
          "specificRoles": "Specific Roles"
        },
        "ruleTypeOptions": {
          "grandTotal": "Grand Total",
          "shippingInclTax": "Shipping Cost",
          "numberOfSkus": "Number of SKUs"
        },
        "conditionOperators": {
          "moreThan": "is more than",
          "lessThan": "is less than",
          "moreThanOrEqualTo": "is more than or equal to",
          "lessThanOrEqualTo": "is less than or equal to"
        },
        "inputQuantity": {
          "floatingLabel": "Enter Amount",
          "placeholder": "Enter Amount"
        },
        "inputAmount": {
          "floatingLabel": "Enter Amount",
          "placeholder": "Enter Amount"
        },
        "buttons": {
          "cancel": "Cancel",
          "save": "Save"
        }
      },
      "errorsMessages": {
        "required": "This field is required.",
        "quantity": "Quantity must be greater than 0.",
        "amount": "Amount must be greater than 0.",
        "approvers": "Please select at least one approver."
      }
    },
    "approvalRuleDetails": {
      "containerTitle": "View Approval Rule",
      "buttons": {
        "back": "Back to Rules List"
      },
      "fields": {
        "ruleName": "Rule Name:",
        "status": "Status:",
        "description": "Description:",
        "appliesTo": "Applies To:",
        "requiresApprovalFrom": "Requires Approval From:",
        "ruleType": "Rule Type:",
        "amount": {
          "label": " amount "
        },
        "statusView": {
          "enabled": "Enabled",
          "disabled": "Disabled"
        },
        "condition": {
          "attribute": {
            "grand_total": "Grand Total",
            "shipping_incl_tax": "Shipping Cost",
            "number_of_skus": "Number of SKUs"
          },
          "operator": {
            "more_than": "Is more than",
            "less_than": "Is less than",
            "more_than_or_equal_to": "Is more than or equal to",
            "less_than_or_equal_to": "Is less than or equal to"
          }
        }
      }
    }
  }
}
;

export default _default;
