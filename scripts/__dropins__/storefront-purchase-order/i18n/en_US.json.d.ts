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
            "containerTitle": "Approval Rules",
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
            "description": "Your Purchase Order request number is ",
            "helpText": "A copy of this Purchase Order will be emailed to you shortly.",
            "button": "Continue Shopping"
        }
    }
};

export default _default;
