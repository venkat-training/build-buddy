# 🔧 Troubleshooting Guide — Build Buddy

This guide covers common issues when setting up or running **Build Buddy – AI PC Build Assistant**.

Architecture:

Browser (React)
→ Algolia Agent Studio
→ Google Gemini (LLM)
→ Algolia Search Indices

---

## 🚨 Frontend Issues

### ❓ "Agent responses will appear here" but nothing happens

#### Causes
- Agent not published
- Wrong Agent ID
- Missing environment variables

#### Fix

Verify in `.env`:

VITE_ALGOLIA_APP_ID=xxxx
VITE_ALGOLIA_AGENT_ID=xxxx
VITE_ALGOLIA_SEARCH_KEY=xxxx


Then restart dev server:

```bash
npm run dev


Also confirm:

Agent is Published in Algolia Agent Studio

Agent ID matches dashboard

Search key is Search API Key, not Admin

❓ 404 Not Found
Cause

Agent endpoint incorrect or agent not published.

Fix

Open Algolia Dashboard

Go to Agent Studio

Confirm agent status = Published

Copy Agent ID again

❓ 429 Too Many Requests

You exceeded Algolia free tier limits.

Fix

Wait 60 seconds.

Build Buddy enforces:

1 request every 2 seconds

Free tier ≈ 15/min

❓ "The AI service is temporarily unavailable"
Causes

Gemini API delay

Algolia transient outage

Network instability

Fix

Simply retry.

Check status:

https://status.algolia.com/

🧠 Agent Returns Empty or Partial Answers
Causes

Gemini timeout

Large prompt

Streaming cut early

Fix

Ask shorter queries.

Example:

✅ "Ryzen 7800X3D gaming PC"

❌ "Explain entire build with prices and benchmarks across regions"

🔐 Environment Variable Issues
❓ Variables not loading

Vite requires prefix:

VITE_


Wrong:

ALGOLIA_APP_ID


Correct:

VITE_ALGOLIA_APP_ID


Restart after changes:

npm run dev

📦 Upload Script Issues (Data Indexing)
❓ algoliasearch is not a function

Use Algolia v4:

npm uninstall algoliasearch
npm install algoliasearch@4 dotenv

❓ Cannot find module dotenv
npm install dotenv

❓ Upload succeeds but dashboard empty

Wait 10 seconds then refresh.

Verify indices exist:

pc_cpus

pc_motherboards

pc_gpus

pc_ram

pc_psus

pc_cases

pc_coolers

pc_storage

Each should contain 4 records.

❓ Agent Returns No Search Results

Confirm:

Agent tools connected to ALL indices

Index names exactly match:

pc_cpus
pc_motherboards
pc_gpus
pc_ram
pc_psus
pc_cases
pc_coolers
pc_storage

🌐 Deployment (Vercel)
❓ Works locally but not on Vercel

You forgot environment variables.

Fix:

Vercel Dashboard →
Project →
Settings →
Environment Variables

Add:

VITE_ALGOLIA_APP_ID

VITE_ALGOLIA_AGENT_ID

VITE_ALGOLIA_SEARCH_KEY

VITE_ALGOLIA_AGENT_BASE_URL (optional)

Redeploy.

❓ CORS Errors

Do NOT proxy Agent Studio.

Browser must directly call:

https://{APP_ID}.algolia.net

✅ Quick Health Checklist

 Node ≥18

 Agent published

 Indices populated

 VITE env vars set

 Search API key used

 Gemini connected

 Vercel env vars configured

🆘 Still Stuck?

Please provide:

Browser console error

Network tab status code

Agent publish status

Screenshot of indices

Never share API keys.

✅ Success Looks Like

You should see:

Example queries clickable

Agent replies within ~3s

Compatible components returned

No console errors

8 indices populated

🚀 Next Steps

Add chat UI

Add build summaries

Add price comparison

Add dark mode

Add saved builds

Built with ❤️ by Venkat