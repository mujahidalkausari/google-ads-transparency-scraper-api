// Check a list of domains for Google Ads and print one line per domain.
//
// Usage:
//   npm install apify-client
//   export APIFY_TOKEN=your_token_here
//   node call-with-node.mjs
import { readFileSync } from 'node:fs';

import { ApifyClient } from 'apify-client';

if (!process.env.APIFY_TOKEN) {
    console.error('Set APIFY_TOKEN to your Apify API token.');
    process.exit(1);
}

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });
const input = JSON.parse(readFileSync(new URL('./input.json', import.meta.url), 'utf8'));

// Starts the run and waits until every domain has been checked.
const run = await client.actor('alkausari_mujahid/google-ads-transparency-scraper').call(input);

const { items } = await client.dataset(run.defaultDatasetId).listItems();
for (const item of items) {
    const details = item.ads_ever === 'Yes' ? `${item.adsCount}, ${item.type_of_ad}, last shown ${item.date_of_last_running}` : '';
    console.log(`${item.domain}: ${item.ads_ever ?? `error: ${item.error}`} ${details}`);
}
