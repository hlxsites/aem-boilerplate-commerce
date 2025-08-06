declare const _default: {
  "PaymentServices": {
    "CreditCard": {
      "formFields": {
        "cvv": {
          "invalidError": "Enter valid cvv.",
          "label": "",
          "missingError": "This field is required.",
          "placeholder": "CVV*"
        },
        "expirationDate": {
          "invalidError": "Enter valid expiration date.",
          "label": "",
          "missingError": "This field is required.",
          "placeholder": "MM/YY*"
        },
        "number": {
          "invalidError": "Enter valid card number.",
          "label": "",
          "missingError": "This field is required.",
          "placeholder": "Card Number*"
        }
      },
      "messages": {
        "methodNotAvailable": "Payment method not available. Please contact support.",
        "methodNotLoaded": "Failed to load payment method. Please try again later."
      }
    },
    "ApplePay": {
      "messages": {
        "methodNotAvailable": "Apple Pay not available on this device. Please use another payment method.",
        "methodNotLoaded": "Failed to load Apple Pay. Please try again later.",
        "loading": "Loading Apple Pay...",
        "cartRequired": "Please add items to your cart to use Apple Pay",
        "unavailable": "Apple Pay is currently unavailable"
      }
    }
  }
}
;

export default _default;
