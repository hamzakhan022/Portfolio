# Screenshots to take

Drop each file into the folder shown, using the exact file name, then rebuild.
The site checks for each file at build time. Until a file exists, a neutral
placeholder is shown in its browser frame.

## How to capture

- **Size:** 1600 × 1000 px (16:10) or 2880 × 1800 px for retina. Anything 16:10 works; other ratios get cropped from the top-left.
- **Format:** PNG. Next.js serves it as AVIF/WebP automatically.
- **Window:** capture the page content only, without the browser toolbar (the site draws its own frame).
- **Theme:** light theme in the app, if it has one.
- **Hide client data:** use demo/test data, or blur client names, company names, people's names, emails, phone numbers, addresses, account numbers and any amounts that identify a real client. For the pharma system, also hide the distributor's business name, logo and owner's name.

## Home page and case-study headers (the most important shots)

| Folder | File | What to show |
| --- | --- | --- |
| `orbit/` | `orbit-dashboard.png` | Main dashboard for the **demo company**: weekly KPIs, sales, labour and GP. Hide client data. |
| `mca-pro/` | `mcapro-dashboard.png` | Leadership dashboard: upcoming deadlines, work by status, capacity. Hide client names and staff names. |
| `restocore/` | `restocore-till.png` | Till screen with menu categories, an open order and the payment buttons, using a test restaurant. Hide client data. |
| `pharma-distribution/` | `pharma-invoice.png` | Invoice screen showing MRP → trade price → discount, bonus units and tax per line. Hide the distributor's name and logo, plus customer names. |

## Case-study galleries

| Folder | File | What to show |
| --- | --- | --- |
| `orbit/` | `orbit-flash-report.png` | Weekly flash report for one week across several sites: actual vs budget. Demo data. Hide client data. |
| `orbit/` | `orbit-budget.png` | Budget generation or the budget-vs-actual screen for the demo company. Hide client data. |
| `mca-pro/` | `mcapro-recurring-work.png` | Recurring work list: service type (VAT, CT600, accounts…), deadline, preparer, reviewer. Hide client data and staff names. |
| `mca-pro/` | `mcapro-signoff.png` | One filing with the submission-reference field and the preparer → reviewer sign-off. Hide client data. |
| `restocore/` | `restocore-kitchen-display.png` | Kitchen display with a few order tickets. Test restaurant. Hide client data. |
| `restocore/` | `restocore-z-report.png` | End-of-day Z-report: sales, tax and payment totals. Test restaurant. Hide client data. |
| `pharma-distribution/` | `pharma-stock-batches.png` | One product's batches with expiry dates and quantities (FEFO). Hide the distributor's name and logo. |
| `pharma-distribution/` | `pharma-recovery-sheet.png` | A recovery sheet for one route or beat. Replace or blur customer names and balances. Hide client data. |

To change a file name or the alt text, edit `content/projects.ts`.
