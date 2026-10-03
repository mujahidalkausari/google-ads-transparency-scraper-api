# Google Ads Transparency Scraper: check if any domain runs Google Ads

Paste a list of websites and find out, for each one, whether it has **ever run Google Ads**: Yes or No, roughly how many ads, when an ad was last shown, the ad format, and a direct link to the ads on Google's Ads Transparency Center.

**▶ [Run it on Apify](https://apify.com/alkausari_mujahid/google-ads-transparency-scraper)**: no code needed. Or call it from your own code through the API, as shown below.

This repository holds usage examples and sample output. The scraper itself runs on the Apify platform.

> Unofficial tool. Not affiliated with or endorsed by Google. It reads only public data from the [Google Ads Transparency Center](https://adstransparency.google.com/) and needs no Google account.

## What you get for each domain

| Field                  | Example              | Meaning                                                                    |
| ---------------------- | -------------------- | -------------------------------------------------------------------------- |
| `domain`               | `tesla.com`          | The domain that was checked                                                |
| `ads_ever`             | `Yes`                | `Yes` if Google lists ads for it, `No` if not, `null` if it couldn't be checked |
| `adsCount`             | `~5K`                | Number of ads, as Google shows it                                          |
| `date_of_last_running` | `Oct 2, 2026`        | When an ad was last shown                                                  |
| `type_of_ad`           | `Image`              | Format of the latest ad: `Text`, `Image` or `Video`                        |
| `ads_link`             | `https://adstransparency.google.com/advertiser/…` | Link to the ads on the Transparency Center    |
| `error`                | `null`               | Why a domain couldn't be checked, otherwise `null`                         |

See [sample-output/](sample-output/) for real results in JSON and CSV.

## Quick start

You need an Apify account (there's a free tier) and your API token from **Apify Console → Settings → API & Integrations**. Set it as an environment variable:

```bash
export APIFY_TOKEN=your_token_here
```

### curl: up to about 30 domains

One request starts the run, waits for it, and returns the results. The request waits at most 5 minutes, which fits roughly 30 domains; for longer lists use Node.js or Python below.

```bash
curl -s -X POST \
  "https://api.apify.com/v2/acts/alkausari_mujahid~google-ads-transparency-scraper/run-sync-get-dataset-items" \
  -H "Authorization: Bearer $APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"domains": ["tesla.com", "apple.com"]}'
```

### Node.js: any list size

```bash
npm install apify-client
```

```js
import { ApifyClient } from 'apify-client';

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });

// Starts the run and waits until every domain has been checked.
const run = await client.actor('alkausari_mujahid/google-ads-transparency-scraper').call({
    domains: ['tesla.com', 'apple.com', 'https://www.shopify.com/'],
    region: 'anywhere',
});

const { items } = await client.dataset(run.defaultDatasetId).listItems();
for (const item of items) {
    console.log(item.domain, item.ads_ever, item.adsCount ?? '');
}
```

### Python: any list size

```bash
pip install apify-client
```

```python
import os
from apify_client import ApifyClient

client = ApifyClient(os.environ["APIFY_TOKEN"])

# Starts the run and waits until every domain has been checked.
run = client.actor("alkausari_mujahid/google-ads-transparency-scraper").call(
    run_input={"domains": ["tesla.com", "apple.com", "https://www.shopify.com/"], "region": "anywhere"}
)

for item in client.dataset(run["defaultDatasetId"]).iterate_items():
    print(item["domain"], item["ads_ever"], item.get("adsCount") or "")
```

The same scripts are in [examples/](examples/).

## Input

| Field                | Default            | What it does                                                                      |
| -------------------- | ------------------ | --------------------------------------------------------------------------------- |
| `domains`            | required           | Domains or full URLs; each is reduced to its domain (`https://www.x.com/page` → `x.com`) |
| `region`             | `anywhere`         | A two-letter country code such as `US`, `GB` or `DE` to see ads for that country only |
| `maxDomainsPerRun`   | `0` (no limit)     | Check only the first N domains, handy for a test run                               |
| `proxyConfiguration` | no proxy           | Leave as no proxy unless you have a reason not to; see pricing                      |

Duplicate domains, including `www.` variants, are checked once.

## Pricing

You pay per domain checked, and the price depends only on your proxy setting:

| Proxy setting           | Per 1,000 domains |
| ----------------------- | ----------------: |
| No proxy (default)      |        **$12.00** |
| Apify datacenter proxy  |            $18.00 |
| Apify residential proxy |            $24.00 |

**No proxy is the recommended choice.** It's the cheapest and about 30% faster than a proxied run. If Google blocks the run, it automatically continues through datacenter proxy at no extra cost.

Want a second look at some results? Re-run just the `No` domains with no proxy. For example, 1,000 domains with 400 `No` results costs $16.80 in total, versus $24.00 for one residential run.

## Use cases

- **Agencies:** find businesses that don't advertise yet (new clients) or that do (upsell and audits)
- **Competitor research:** see which competitors advertise, how much, and in which countries
- **List screening:** enrich a CRM or lead list with a "runs Google Ads" flag before outreach

More in [docs/use-cases.md](docs/use-cases.md). Common questions are answered in [docs/faq.md](docs/faq.md).

## Support

Questions, bugs or custom work: open an issue on the [Actor's Apify page](https://apify.com/alkausari_mujahid/google-ads-transparency-scraper) or email **alkausarimujahid@gmail.com**.
