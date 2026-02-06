# 🔧 Build Buddy - AI PC Building Assistant

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://build-buddy-pi.vercel.app)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Algolia](https://img.shields.io/badge/Powered%20by-Algolia-5468FF?style=for-the-badge)](https://www.algolia.com)

> An intelligent PC building assistant powered by Algolia Agent Studio that helps users create compatible computer builds through AI-driven compatibility validation.

**🏆 Submission for:** [Algolia Agent Studio Challenge](https://dev.to/challenges/algolia-2026-01-07) - Consumer-Facing Non-Conversational Experiences

---

## 🎯 The Problem

Building a custom PC is exciting but fraught with compatibility issues:

- ❌ **Socket Incompatibility** - Will this CPU fit this motherboard?
- ❌ **RAM Confusion** - DDR4 or DDR5? What speed?
- ❌ **Physical Constraints** - Will this GPU fit in my case?
- ❌ **Power Calculations** - Is my PSU strong enough?
- ❌ **Cooling Capacity** - Can this cooler handle my CPU?

**Build Buddy solves these problems with AI-powered compatibility checking.**

---

## ⚡ Quick Start (Try it Now!)

**No setup required - try the live demo:**
1. Visit [build-buddy-pi.vercel.app](https://build-buddy-pi.vercel.app)
2. Type: *"I want to build a gaming PC with Ryzen 7 7800X3D"*
3. Click "Ask Agent"
4. See instant, intelligent compatibility recommendations!

**Want to run locally?** See [Getting Started](#-getting-started) below.

---

## ✨ Features

### Core Capabilities

- 🤖 **AI-Powered Assistance** - Natural language queries about PC components
- ⚡ **Real-Time Validation** - Instant compatibility checking across 8 component types
- 🎯 **Multi-Dimensional Checks** - Validates physical, electrical, and interface compatibility
- 💡 **Smart Recommendations** - Suggests compatible alternatives based on use case
- 🚀 **Lightning Fast** - Sub-50ms search powered by Algolia
- 💰 **Budget Aware** - Considers price constraints in recommendations

### Technical Features

- 8 specialized Algolia indices with 32 PC components
- Google Gemini 1.5 Flash integration (FREE tier)
- Intelligent fallback for offline compatibility checking
- Zero-credential exposure (all keys in environment variables)
- Production-ready deployment on Vercel

---

## 🎬 Live Demo

🔗 **Try it now:** [https://build-buddy-pi.vercel.app](https://build-buddy-pi.vercel.app)

### Test Queries

Try these example queries to see Build Buddy in action:

**Beginner Query:**
```
"I want to build a gaming PC with Ryzen 7 7800X3D"
```

**Compatibility Check:**
```
"Will RTX 4090 fit in NZXT H510 Flow case?"
```

**Detect Issues:**
```
"Check compatibility: AMD Ryzen 7800X3D with ASUS Z790 motherboard"
```
*(The agent will correctly identify the socket mismatch!)*

---

## 🏗️ Architecture

### Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React + Vite | Fast, modern UI |
| **AI/Search** | Algolia Agent Studio | Intelligent query handling |
| **LLM** | Google Gemini 1.5 Flash | Natural language understanding |
| **Hosting** | Vercel | Zero-config deployment |
| **Styling** | Custom CSS | Clean, responsive design |

### Data Structure

**8 Specialized Indices:**

```
pc_cpus          →  Processors (socket, TDP, chipsets)
pc_motherboards  →  Motherboards (form factor, DDR support)
pc_gpus          →  Graphics cards (dimensions, power)
pc_ram           →  Memory (DDR type, speed, capacity)
pc_psus          →  Power supplies (wattage, efficiency)
pc_cases         →  Cases (clearances, form factors)
pc_coolers       →  CPU coolers (socket compatibility)
pc_storage       →  Drives (interface, speed)
```

**Total:** 32 components with full compatibility metadata

### Architecture Flow

```
┌─────────────┐
│   Browser   │
│  (React UI) │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────┐
│   Algolia Agent Studio      │
│   (Orchestration Layer)     │
└──────┬──────────────────────┘
       │
       ├─────► Google Gemini (LLM)
       │
       └─────► Algolia Search (8 Indices)
                - pc_cpus
                - pc_motherboards
                - pc_gpus
                - pc_ram
                - pc_psus
                - pc_cases
                - pc_coolers
                - pc_storage
```

### Compatibility Rules

Build Buddy validates:

**Physical Compatibility:**
- GPU length vs case clearance
- CPU cooler height vs case height
- Motherboard form factor support

**Electrical Compatibility:**
- CPU TDP vs cooler rating
- Total system power vs PSU wattage
- Power connector availability

**Interface Compatibility:**
- CPU socket matching
- RAM DDR generation matching
- Storage interface support

---

## 💰 Total Cost: $0

This entire project runs on free tiers:

- ✅ **Algolia Build Plan** - FREE (10,000 searches/month)
- ✅ **Google Gemini API** - FREE (15 requests/min, 1M tokens/day)
- ✅ **Vercel Hosting** - FREE (hobby tier)

**No credit card required for any service!**

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- Free Algolia account
- Free Google AI account

### Quick Start (5 minutes)

#### 1. Clone the Repository

```bash
git clone https://github.com/venkat-training/build-buddy.git
cd build-buddy
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Get API Credentials

**Algolia (FREE):**
1. Sign up at [algolia.com/users/sign_up](https://www.algolia.com/users/sign_up)
2. Select **"Build Plan"** (no credit card required)
3. Go to **Dashboard → Settings → API Keys**
4. Copy: **Application ID**, **Admin API Key**, **Search-Only API Key**

**Google AI (FREE):**
1. Go to [aistudio.google.com](https://aistudio.google.com/)
2. Click **"Get API Key"** → **"Create API key"**
3. Copy the API key

#### 4. Configure Environment

```bash
# Copy example environment file
cp .env.example .env

# Edit .env and add your credentials:
# ALGOLIA_APP_ID=your_app_id
# ALGOLIA_ADMIN_API_KEY=your_admin_key
# ALGOLIA_SEARCH_KEY=your_search_key
```

#### 5. Upload Component Data

```bash
node upload-to-algolia.js
```

**Expected output:**
```
✅ Uploaded CPUs (4 components)
✅ Uploaded Motherboards (4 components)
✅ Uploaded GPUs (4 components)
...
✨ All data uploaded successfully!
```

#### 6. Configure Agent Studio

1. Go to **Algolia Dashboard → Generative AI Experiences → Agent Studio**
2. Click **"Create Agent"**
3. Configure:
   - **Name:** Build Buddy PC Compatibility Agent
   - **LLM Provider:** Google Gemini
   - **Model:** Gemini 1.5 Flash
   - **API Key:** [Your Google AI key]
4. Copy system prompt from `ALGOLIA_SETUP_GUIDE.md`
5. Enable all 8 indices as retrieval sources
6. Click **"Publish"**
7. Copy the **Agent ID**

#### 7. Run the Frontend

```bash
cd build-buddy-app
npm install

# Add frontend environment variables to .env:
# VITE_ALGOLIA_APP_ID=your_app_id
# VITE_ALGOLIA_SEARCH_KEY=your_search_key
# VITE_ALGOLIA_AGENT_ID=your_agent_id
# VITE_ALGOLIA_AGENT_BASE_URL=https://your_app_id.algolia.net

npm run dev
```

🎉 Visit **http://localhost:3000** and start asking questions!

---

## 📚 Documentation

Comprehensive guides for every step:

- **[Quick Start Guide](QUICK_START_GUIDE.md)** - Get running in 20 minutes
- **[Algolia Setup Guide](ALGOLIA_SETUP_GUIDE.md)** - Detailed Algolia configuration
- **[Deployment Guide](DEPLOYMENT_CHECKLIST.md)** - Deploy to production
- **[Troubleshooting](TROUBLESHOOTING.md)** - Common issues and solutions

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

#### Option 1: Deploy from GitHub

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click **"New Project"**
4. Import your repository
5. Add environment variables:
   ```
   VITE_ALGOLIA_APP_ID
   VITE_ALGOLIA_SEARCH_KEY
   VITE_ALGOLIA_AGENT_ID
   VITE_ALGOLIA_AGENT_BASE_URL
   ```
6. Click **"Deploy"**

#### Option 2: Deploy with CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd build-buddy-app
vercel

# Follow prompts, then add environment variables in dashboard
# Finally deploy to production:
vercel --prod
```

Your app will be live at: `https://your-project.vercel.app`

---

## 🎯 How It Works

### User Experience Flow

1. **User asks a question** - Natural language query about PC components
2. **Agent Studio receives query** - Forwards to configured LLM (Gemini)
3. **LLM analyzes intent** - Determines which components are relevant
4. **Algolia searches indices** - Fast retrieval across 8 component types
5. **Agent validates compatibility** - Checks multi-dimensional rules
6. **Response generated** - Intelligent, context-aware answer
7. **User receives answer** - Clear explanation with recommendations

### Example Query Flow

**User:** "I want to build a gaming PC with Ryzen 7 7800X3D"

**System:**
1. Searches `pc_cpus` index → Finds Ryzen 7 7800X3D (AM5 socket, DDR5)
2. Searches `pc_motherboards` → Filters for AM5 + DDR5
3. Searches `pc_gpus` → Suggests gaming-focused options
4. Calculates power requirements
5. Suggests compatible PSU

**Response:** "Great choice! The AMD Ryzen 7 7800X3D is an excellent gaming CPU. You'll need an AM5 motherboard with DDR5 support. Compatible options include..."

---

## 🏆 What Makes This Unique

### Compared to Other Solutions

| Feature | Build Buddy | PCPartPicker | Reddit/Forums | ChatGPT |
|---------|-------------|--------------|---------------|---------|
| **Real-time AI** | ✅ | ❌ | ❌ | ⚠️ (Limited) |
| **Verified Data** | ✅ | ✅ | ❌ | ❌ |
| **Natural Language** | ✅ | ❌ | ✅ | ✅ |
| **Instant Answers** | ✅ | ⚠️ | ❌ | ⚠️ |
| **No Hallucinations** | ✅ | ✅ | ❌ | ❌ |
| **Free to Use** | ✅ | ✅ | ✅ | ⚠️ (Limited) |

### Key Differentiators

1. **Grounded AI** - All responses based on actual component data in Algolia
2. **Fast Retrieval** - Sub-50ms searches enable real-time conversations
3. **Multi-Dimensional Validation** - Checks physical, electrical, and interface compatibility
4. **Conversational Interface** - Ask questions naturally, get intelligent answers
5. **Zero Cost** - Built entirely on free tiers

---

## ❓ Troubleshooting

### "Agent returns no response"
1. Check Agent is Published in Algolia Dashboard
2. Verify Gemini API key is valid at [aistudio.google.com](https://aistudio.google.com/)
3. Check browser console for errors (F12)

### "404 Not Found"
1. Verify Agent ID is correct in environment variables
2. Check `VITE_ALGOLIA_AGENT_BASE_URL` is set correctly
3. Ensure agent is published (not draft) in Agent Studio

### "Rate limit exceeded"
The free Gemini tier allows 15 requests per minute. Wait 60 seconds between requests.

**More help:** See [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

---

## 🤝 Contributing

Contributions are welcome! Here are some ideas:

### Component Library Expansion
- [ ] Add 100+ components per category
- [ ] Include historical pricing data
- [ ] Add performance benchmarks

### New Features
- [ ] Build templates (Gaming, Workstation, Budget)
- [ ] Component comparison tool
- [ ] Build sharing and community ratings
- [ ] Price tracking and alerts
- [ ] Assembly guide generator

### Technical Improvements
- [ ] Add more LLM providers
- [ ] Implement caching layer
- [ ] Add monitoring/analytics
- [ ] Create mobile app

**To contribute:**
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details

Free to use, modify, and distribute!

---

## 🙏 Acknowledgments

- **Algolia** - For Agent Studio and incredible search infrastructure
- **Google** - For Gemini's free tier making this possible
- **DEV Community** - For hosting the challenge
- **PC Building Community** - For compatibility knowledge and insights

---

## 📞 Support & Questions

### Documentation
- 📖 [Full Documentation](ALGOLIA_SETUP_GUIDE.md)
- 🐛 [Troubleshooting Guide](TROUBLESHOOTING.md)
- 🚀 [Deployment Guide](DEPLOYMENT_CHECKLIST.md)

### Community
- 💬 [GitHub Issues](https://github.com/venkat-training/build-buddy/issues)
- 🎮 [Algolia Discord](https://discord.com/invite/algolia)

### Contact
- 👤 **Built by:** Venkat
- 📧 **GitHub:** [@venkat-training](https://github.com/venkat-training)

---

## 🎯 Challenge Submission

This project was built for the **Algolia Agent Studio Challenge** (January 2026).

**Category:** Consumer-Facing Non-Conversational Experiences  
**Technologies:** React, Vite, Algolia Agent Studio, Google Gemini 1.5 Flash  
**Development Time:** ~20 hours over 3 days  
**Total Cost:** $0

**📖 Read the full submission:** [Build Buddy - DEV.to Post](https://dev.to/venkattraining/build-buddy-ai-pc-building-assistant-powered-by-algolia-agent-studio-52m4)

---

<div align="center">

### ⭐ If you found this helpful, please star the repo!

**Built with ❤️ by Venkat**

[Live Demo](https://build-buddy-pi.vercel.app) • [Documentation](ALGOLIA_SETUP_GUIDE.md) • [Report Bug](https://github.com/venkat-training/build-buddy/issues)

</div>