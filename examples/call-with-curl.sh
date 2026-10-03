#!/usr/bin/env bash
# Check a short list of domains for Google Ads with a single API request.
#
# The request waits at most 5 minutes for the run to finish (about 30 domains).
# For longer lists use call-with-node.mjs or call-with-python.py instead.
#
# Usage:
#   export APIFY_TOKEN=your_token_here
#   ./call-with-curl.sh
set -euo pipefail

: "${APIFY_TOKEN:?Set APIFY_TOKEN to your Apify API token}"

curl -s -X POST \
  "https://api.apify.com/v2/acts/alkausari_mujahid~google-ads-transparency-scraper/run-sync-get-dataset-items" \
  -H "Authorization: Bearer $APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  --data @"$(dirname "$0")/input.json"
