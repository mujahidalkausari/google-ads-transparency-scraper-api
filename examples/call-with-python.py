"""Check a list of domains for Google Ads and print one line per domain.

Usage:
    pip install apify-client
    export APIFY_TOKEN=your_token_here
    python call-with-python.py
"""
import json
import os
import sys
from pathlib import Path

from apify_client import ApifyClient

token = os.environ.get("APIFY_TOKEN")
if not token:
    sys.exit("Set APIFY_TOKEN to your Apify API token.")

client = ApifyClient(token)
run_input = json.loads((Path(__file__).parent / "input.json").read_text())

# Starts the run and waits until every domain has been checked.
run = client.actor("alkausari_mujahid/google-ads-transparency-scraper").call(run_input=run_input)

for item in client.dataset(run["defaultDatasetId"]).iterate_items():
    if item["ads_ever"] == "Yes":
        details = f'{item["adsCount"]}, {item["type_of_ad"]}, last shown {item["date_of_last_running"]}'
    else:
        details = ""
    status = item["ads_ever"] or f'error: {item["error"]}'
    print(f'{item["domain"]}: {status} {details}')
