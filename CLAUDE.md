# Insure Media Group CRM — Claude Context

## Project Overview
Single-page staff management CRM for Insure Media Group. Started as a pure localStorage HTML file, now backed by PostgreSQL via Express.

## Tech Stack
- **Frontend**: Single `index.html` — all HTML/CSS/JS, no framework, no build step
- **Backend**: `server.js` — Node.js + Express
- **Database**: PostgreSQL via `pg` library
- **Auth**: Username/password checked server-side at `POST /api/login`
- **Hosting**: Render (web service + managed PostgreSQL)
- **Repo**: https://github.com/khurram101/insure-media-crm

## File Structure
```
staffcrm/
├── index.html      # Entire frontend
├── server.js       # Express API + DB logic
├── package.json    # express, pg, dotenv
├── render.yaml     # Render deployment config
├── .env            # Local env vars (gitignored)
└── .gitignore
```

## API Endpoints
| Method | Path | Purpose |
|--------|------|---------|
| POST | /api/login | Validate credentials, returns `{ ok, role }` |
| GET | /api/data | Load all 8 data arrays from PostgreSQL |
| PUT | /api/data | Save all 8 data arrays to PostgreSQL |

## Database Schema
```sql
CREATE TABLE crm_store (
  key TEXT PRIMARY KEY,
  val JSONB NOT NULL DEFAULT '[]'
);
```
Keys: `emp`, `att`, `adj`, `sls`, `exp`, `cats`, `jobs`, `rec`

## Frontend Data Arrays
```js
var E=[], A=[], J=[], S=[], X=[], C=[], P=[], R=[];
// E=employees, A=attendance, J=adjustments, S=sales
// X=expenses, C=custom categories, P=job positions, R=recurring
```

## Credentials (server-side only)
- `admin` / `Admin@2024` — full access
- `manager` / `Manager@2024` — limited access (no expenses tab)

## Key Frontend Functions
- `doLogin()` — async, calls `/api/login` then `/api/data`
- `loadData()` — async fetch from `/api/data`
- `saveData()` — fire-and-forget PUT to `/api/data`
- `showTab(tab)` / `renderTab(tab)` — tab navigation and rendering
- `filterByDate(arr, field)` — applies global date range filter
- `setGFilter(type)` / `onRangeChange()` — global filter controls

## Tabs
1. **Dashboard** — KPI cards + charts
2. **Employees** — CRUD + job positions CRUD
3. **Attendance** — mark attendance grid + log with employee search
4. **Salary** — calculated salary breakdown + deductions CRUD
5. **Sales** — sales log CRUD + summary
6. **Expenses** — two sub-tabs: Fixed Monthly (recurring bills) + Daily Expenses

## Expenses Tab Structure
- **Fixed Monthly** sub-tab: recurring expense cards (Office Rent, Electricity, Internet), mark paid, edit, add
- **Daily Expenses** sub-tab: expense log with category filter, add form, manage categories

## Recurring Expense Seeds (auto-seeded on first DB boot)
- `rec_rent_01` — Office Rent, due 5th
- `rec_electric_01` — Electricity, due 5th
- `rec_internet_01` — Internet, due 5th

## Employees (seeded)
Jerry, Nayab Malik, Shoaib Akhtar, Daud Mansha, Amous John — all Sales Agent role, PKR 50,000 base salary

## Global Date Filter
- State: `var gFilter = {type:'month', from:null, to:null}`
- Presets: Today, This Week, This Month, Last Month, All Time
- Custom range: From/To date inputs
- Affects all tabs except Salary (uses its own month picker)

## Local Development
```bash
npm install
# edit .env and set DATABASE_URL=your_postgres_url
npm start   # runs on port 3000
```

## Render Deployment
- Linked to GitHub repo — auto-deploys on push to `main`
- `DATABASE_URL` injected automatically from linked database
- Set `NODE_ENV=production` in Render environment variables
