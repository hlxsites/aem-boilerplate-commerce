# This script runs from elsie/storefront-payment-services folder in npm-publish.
# Reason for the removal of pre-release.sh is so that when npm-publish is called again in workflow/publish.yaml,
# it releases to adobe-commerce instead of dropins.

rm -f ../pre-release.sh
