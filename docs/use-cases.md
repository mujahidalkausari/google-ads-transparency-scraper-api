# Use cases

The [Google Ads Transparency Scraper](https://apify.com/alkausari_mujahid/google-ads-transparency-scraper) answers one question for every domain on a list: has this business ever run Google Ads? Here is how people use that answer.

## Find new clients for a marketing agency

Check a list of local businesses (from a directory, a map search, or your CRM) and split it in two:

- **No ads:** businesses that have never advertised on Google. Pitch them a first campaign.
- **Yes:** businesses already spending on ads. Offer an audit, better creative, or landing-page work. The ad count and last-shown date show how active they are.

## Watch your competitors

Run your competitors' domains on a schedule, for example weekly:

- See who advertises and roughly how much (`adsCount`)
- Notice when a competitor starts or stops (`date_of_last_running`)
- Compare countries by setting `region` (for example `US`, `GB`, `DE`)
- Open `ads_link` to see the actual ads on Google's Transparency Center

## Enrich and screen lead lists

Add a "runs Google Ads" column to a CRM export or a purchased list before outreach. It's a quick signal of marketing budget and digital maturity, which helps you prioritize leads and tailor the message.

## Market research

Measure how many businesses in a niche or region advertise on Google, and in which formats (Text, Image, Video). Larger lists can be split across several runs that execute in parallel.

## Connect it to your tools

Because it runs on Apify, results can flow straight into other tools: Google Sheets, Make, Zapier, n8n, webhooks, or your own code through the [API examples](../examples/).
