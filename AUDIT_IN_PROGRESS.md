# Started But Not Finished (In Progress) Audit

Based on `TODO.md` and `PLANS.md`, the following tasks are currently started but not finished:

## Content & Marketing
- **Facebook Content**: Pending details in `.gemini/facebook_content.md` to generate images/videos.
- **Phase 1: Programmatic Local SEO**: Pending deployment of dedicated landing pages for Albany, Lebanon, Sweet Home, Burns, Riley, Drewsey.
- **Phase 2: The "True Cost" Content Hub**: Pending interactive calculator tools and high-density investigational articles.

## Infrastructure & Integrations
- **PandaDoc API Keys**: Need to replace `signatures.ts` mocks with real-world production tokens.
- **Metabase Metadata**: Need to deploy the BI layer to visualize MRR growth from the `mrr_analytics` view.

## Testing, QA & Monitoring
- **Database Health Check**: Monitor the first production enrichment events for the `properties` table.
- **Chatbot (Gus)**: Verify production streaming performance under load.
- **Lighthouse Prod Audit**: Run an actual performance audit on the live URL to verify LCP < 2.5s.
- **Phase 3: Continuous GSC Monitoring**: Ongoing monitoring of impressions and triggering A/B tests via Genkit.