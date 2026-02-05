# 🔧 Build Buddy - AI PC Building Assistant

[![Demo](https://img.shields.io/badge/demo-live-success)](https://build-buddy.vercel.app)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

An intelligent PC building assistant powered by **Algolia Agent Studio** that helps users create compatible computer builds through proactive, real-time compatibility checking.

**🏆 Submission for:** [Algolia Agent Studio Challenge](https://dev.to/challenges/algolia-2026-01-07) - Consumer-Facing Non-Conversational Experiences

---

## 🎯 The Problem

Building a custom PC is exciting, but compatibility issues are frustrating:
- ❌ Will this CPU fit this motherboard? (Socket incompatibility)
- ❌ Is my RAM compatible? (DDR4 vs DDR5 confusion)  
- ❌ Will this GPU physically fit in my case? (Clearance issues)
- ❌ Do I have enough power supply wattage? (Power calculations)
- ❌ Can my cooler handle this CPU? (TDP mismatches)

**Build Buddy solves this with AI-powered proactive warnings.**

---

## ✨ Key Features

- ✅ **Real-time Compatibility Checking** - Instant validation as you select components
- ⚡ **Proactive Warnings** - Prevents incompatible builds before they happen
- 🎯 **Multi-dimensional Validation** - Checks sockets, power, physical clearances, DDR types
- 💡 **Smart Suggestions** - Recommends compatible alternatives when conflicts arise
- 💰 **Budget Tracking** - Real-time price totals
- 🚀 **Fast Retrieval** - Sub-50ms search powered by Algolia

---

## 🎬 Demo

🔗 **[Live Demo](https://build-buddy.vercel.app)**

### Test Scenarios

**✅ Compatible Build:**
1. Select AMD Ryzen 7 7800X3D (AM5)
2. Select MSI MAG B650 TOMAHAWK (AM5)
3. Watch the green checkmarks appear!

**⚠️ Incompatible Build:**
1. Select AMD Ryzen 7 7800X3D (AM5 socket)
2. Try to add ASUS Z790-E (LGA1700 socket)
3. See the immediate error warning!

---

## 🏗️ Architecture

### Technology Stack

- **Frontend:** React + Vite
- **AI/Search:** Algolia Agent Studio + InstantSearch
- **LLM:** Google Gemini 1.5 Flash (FREE tier)
- **Deployment:** Vercel
- **Styling:** Custom CSS

### Algolia Integration

**8 Specialized Indices:**
- `pc_cpus` - Processors with socket types, TDP, compatibility
- `pc_motherboards` - Motherboards with chipsets, form factors
- `pc_gpus` - Graphics cards with dimensions, power requirements
- `pc_ram` - Memory with DDR types, speeds
- `pc_psus` - Power supplies with wattage ratings
- `pc_cases` - Cases with clearances, form factor support
- `pc_coolers` - CPU coolers with socket compatibility
- `pc_storage` - Storage drives with interface types

**32 Components Total** with full compatibility metadata

---

## 💰 Total Cost: $0

- ✅ Algolia Build Plan (FREE - no credit card)
- ✅ Google Gemini API (FREE - 15 req/min, 1M tokens/day)
- ✅ Vercel Deployment (FREE hobby tier)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Free Algolia account
- Free Google AI account

### Step 1: Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/build-buddy.git
cd build-buddy
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Get API Credentials

**Algolia (FREE):**
1. Sign up at https://www.algolia.com/users/sign_up
2. Select "Build Plan" (no credit card required)
3. Go to Dashboard → Settings → API Keys
4. Copy: Application ID, Admin API Key, Search-Only API Key

**Google AI (FREE):**
1. Go to https://aistudio.google.com/
2. Click "Get API Key" → "Create API key"
3. Copy your API key

### Step 4: Configure Environment Variables

```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your credentials:
# - ALGOLIA_APP_ID
# - ALGOLIA_ADMIN_API_KEY
# - ALGOLIA_SEARCH_KEY
```

### Step 5: Upload Component Data to Algolia

```bash
node upload-to-algolia-fixed.js
```

You should see:
```
✅ Uploaded CPUs
✅ Uploaded Motherboards
...
✨ All data uploaded successfully!
```

### Step 6: Configure Agent Studio

1. Go to Algolia Dashboard → **Generative AI Experiences** → **Agent Studio**
2. Click **"Create Agent"**
3. Configure:
   - **Name:** Build Buddy PC Compatibility Agent
   - **LLM Provider:** Google Gemini
   - **Model:** Gemini 1.5 Flash
   - **API Key:** Your Google AI API key
4. Copy the system prompt from `ALGOLIA_SETUP_GUIDE.md`
5. Enable all 8 indices as retrieval sources
6. Publish the agent and copy the **Agent ID**

### Step 7: Run Frontend

```bash
cd build-buddy-app
npm install

# Add frontend environment variables to .env:
# VITE_ALGOLIA_APP_ID
# VITE_ALGOLIA_SEARCH_KEY
# VITE_ALGOLIA_AGENT_ID

npm run dev
```

Visit `http://localhost:3000`

---

## 🌐 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd build-buddy-app
vercel

# Add environment variables in Vercel Dashboard:
# - VITE_ALGOLIA_APP_ID
# - VITE_ALGOLIA_SEARCH_KEY
# - VITE_ALGOLIA_AGENT_ID

# Deploy to production
vercel --prod
```

---

## 📚 Documentation

- **[Quick Start Guide](QUICK_START_GUIDE.md)** - Get up and running in 20 minutes
- **[Algolia Setup Guide](ALGOLIA_SETUP_GUIDE.md)** - Detailed Algolia configuration
- **[Deployment Checklist](DEPLOYMENT_CHECKLIST.md)** - Step-by-step deployment
- **[Troubleshooting](TROUBLESHOOTING.md)** - Common issues and solutions
- **[GitHub Setup](GITHUB_SETUP_GUIDE.md)** - Secure Git workflow

---

## 🎯 How It Works

### Non-Conversational Intelligence

Unlike traditional chatbots, Build Buddy:
- ✅ Works within the existing component selection workflow
- ✅ Proactively prevents errors before they occur
- ✅ Shows visual compatibility indicators (no chat needed)
- ✅ Understands the entire build state contextually

### Compatibility Rules Checked

**Physical:**
- GPU length vs case clearance
- CPU cooler height vs case height
- Motherboard form factor vs case support

**Electrical:**
- CPU TDP vs cooler rating
- Total system power vs PSU wattage
- PCIe connectors vs GPU requirements

**Interface:**
- CPU socket vs motherboard socket
- RAM DDR type vs motherboard DDR support
- Storage interface vs motherboard slots

---

## 🏆 Why This Project Stands Out

### Differentiation from Other Solutions

Most Agent Studio projects are:
- 💬 Conversational shopping assistants
- 🤖 Support chatbots
- 📝 Content summarizers

**Build Buddy is different:**
- ✅ Non-conversational embedded intelligence
- ✅ Multi-dimensional compatibility validation
- ✅ Solves real-world PC building pain point
- ✅ Complex data modeling with 8 interconnected component types
- ✅ Proactive, not reactive

---

## 🤝 Contributing

Contributions are welcome! Ideas for enhancements:

- [ ] Add more components (100+ per category)
- [ ] Build templates (Gaming, Workstation, Budget)
- [ ] Performance benchmarking predictions
- [ ] Price history tracking
- [ ] Build sharing and community ratings
- [ ] Monitor and peripheral recommendations

---

## 📝 License

MIT License - feel free to use this project for your own builds!

---

## 🙏 Acknowledgments

- **Algolia** for Agent Studio and incredible search infrastructure
- **DEV Community** for hosting the challenge
- **PC building community** for compatibility insights

---

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/YOUR_USERNAME/build-buddy/issues)
- **Algolia Discord:** https://discord.com/invite/algolia
- **Documentation:** See the `docs/` folder

---

## 🎯 Challenge Submission

This project was built for the **Algolia Agent Studio Challenge** (January 2026).

**Category:** Consumer-Facing Non-Conversational Experiences

**Technologies:** React, Vite, Algolia Agent Studio, Google Gemini 1.5 Flash

**Read the full submission post:** [DEV.to Post Link]

---

Built with ❤️ by [Your Name]
