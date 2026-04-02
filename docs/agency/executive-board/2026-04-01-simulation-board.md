# 2026-04-01 Executive Board

## Decision
- Release status: `hold`
- Directors blocking release: engineering, QA
- Growth supports remediation before expansion

## Critical Items
| ID | Owner | Issue | State |
| --- | --- | --- | --- |
| SIM-01 | platform_engineering | Hard-coded Google AI API key in backend config | blocked_engineering |
| SIM-02 | platform_engineering | Genkit callable mapping and estimator contract drift | blocked_engineering |
| SIM-03 | verification_release | Demo-mode and placeholder production behavior | blocked_qa |
| SIM-04 | verification_release | Contact path can fail when Upstash is unset | blocked_qa |

## High-Leverage Follow-ups
| ID | Owner | Issue | State |
| --- | --- | --- | --- |
| SIM-05 | search_dominance | Duplicate calculator IA and inconsistent links | in_review |
| SIM-06 | content_production | Projects page remains proof-light placeholder | in_review |
| SIM-07 | platform_engineering | Global AIChat hydration footprint | test_required |
| SIM-08 | platform_engineering | Sanity production env warnings during build | test_required |

## Immediate Order
1. Remove the hard-coded credential and move backend auth back to secrets.
2. Fix callable naming and estimator request/response contracts end to end.
3. Remove demo-mode and placeholder responses from production paths.
4. Make contact submissions degrade safely when Upstash is unset.
5. Consolidate calculator IA and freeze the preferred canonical route.
