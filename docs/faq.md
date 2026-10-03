# FAQ

### How do I check if a website runs Google Ads?

Paste the website's domain into the [Google Ads Transparency Scraper](https://apify.com/alkausari_mujahid/google-ads-transparency-scraper) and start a run. For each domain you get Yes or No, roughly how many ads, when an ad was last shown, the ad format, and a link to the ads on Google's Ads Transparency Center. It works for one domain or for thousands.

### How do I check many domains at once?

Paste the whole list into the `domains` field, or send it through the API (see [examples](../examples/)). Full URLs work too: `https://www.example.com/page` is reduced to `example.com`. Very large lists finish sooner when split across several runs that execute in parallel.

### Can I get Google Ads Transparency Center data through an API?

Yes. The scraper runs on Apify, so every run can be started and read through the Apify API from curl, Node.js, Python or any HTTP client. The [examples](../examples/) folder has a ready-to-run script for each.

### Can I see ads for a specific country?

Yes. Set `region` to a two-letter country code such as `US`, `GB` or `DE`. Leave it as `anywhere` to see all regions combined. Ad counts and dates can differ between countries.

### What does "No" mean?

Google's Transparency Center has no advertiser listed for that domain in the selected region. A business could still advertise under a different domain or a parent company's name. If you want a second look at some `No` results, re-run just those domains; with no proxy that costs about 1 cent per domain.

### How much does it cost?

You pay per domain checked: $12 per 1,000 with no proxy (the default), $18 with Apify datacenter proxy, $24 with Apify residential proxy. Apify's free tier lets you try it first.

### Which proxy setting should I use?

No proxy. It's the cheapest and about 30% faster than a proxied run, and if Google blocks the run, it automatically continues through datacenter proxy at no extra cost.

### How long does it take?

About 8 seconds per domain with no proxy, so a few hundred domains per hour in one run. Proxied runs are slower. Runs have a 2-hour default time limit; raise it in the run options for long lists, or split the list across parallel runs.

### Do I need a Google account?

No. The scraper reads only public data from the Transparency Center and never logs in.

### Is this an official Google tool?

No. It's an independent tool that reads the public [Google Ads Transparency Center](https://adstransparency.google.com/). It is not affiliated with or endorsed by Google.
