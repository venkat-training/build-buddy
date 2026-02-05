# 🔧 Build Buddy - AI PC Building Assistant

An intelligent PC building assistant powered by **Algolia Agent Studio** that helps users create compatible computer builds through proactive compatibility checking and smart recommendations.

**Submission for:** Algolia Agent Studio Challenge - Consumer-Facing Non-Conversational Experiences

---

## 🎯 What It Does

Build Buddy eliminates the frustration of incompatible PC parts by providing **real-time, proactive compatibility warnings** as you build. Unlike traditional conversational chatbots, Build Buddy works seamlessly within the existing workflow - **no back-and-forth dialogue required**.

### Key Features

- ✅ **Real-time Compatibility Checking** - Instant validation as you select components
- ⚡ **Proactive Warnings** - Prevents incompatible builds before they happen
- 🎯 **Multi-dimensional Validation** - Checks sockets, power, physical clearances, DDR types
- 💡 **Smart Suggestions** - Recommends compatible alternatives when conflicts arise
- 💰 **Budget Tracking** - Real-time price totals
- 🚀 **Fast Retrieval** - Sub-50ms search across 8 component indices

---

## 🏗️ Architecture

### Technology Stack

- **Frontend:** React + Vite
- **AI/Search:** Algolia Agent Studio + InstantSearch
- **Styling:** Custom CSS with responsive design
- **Deployment:** Vercel

### Algolia Integration

Build Buddy uses **8 specialized Algolia indices**:

1. `pc_cpus` - Processors with socket types, TDP, compatibility rules
2. `pc_motherboards` - Motherboards with chipset, form factor, DDR support
3. `pc_gpus` - Graphics cards with power requirements, physical dimensions
4. `pc_ram` - Memory with DDR type, speed, capacity
5. `pc_psus` - Power supplies with wattage, connector types
6. `pc_cases` - Cases with clearances, form factor support
7. `pc_coolers` - CPU coolers with socket compatibility, TDP ratings
8. `pc_storage` - Storage drives with interfaces, speeds

### Agent Studio Configuration

The **Build Buddy Agent** is configured with:

- **Purpose:** Intelligent compatibility validation and recommendation engine
- **LLM:** OpenAI GPT-4
- **Retrieval:** Multi-index search with faceted filtering
- **Tools:** Custom compatibility validation functions

**System Prompt:**
```
You are Build Buddy, an expert PC building assistant that prevents incompatible builds.

CRITICAL COMPATIBILITY RULES:
- CPU socket MUST match motherboard socket (AM5, LGA1700, etc.)
- RAM DDR type MUST match motherboard (DDR4 vs DDR5)
- GPU length must fit within case clearance
- PSU wattage must exceed total system power + 20% headroom
- CPU cooler must support CPU socket AND fit case height clearance
- Motherboard form factor must be supported by case

Proactively warn users of incompatibilities BEFORE they add components.
Suggest compatible alternatives when conflicts are detected.
```

---

## 🚀 Setup & Installation

### Prerequisites

- Node.js 18+ 
- Algolia account (free Build plan)
- Git

### Step 1: Clone Repository

```bash
git clone https://github.com/yourusername/build-buddy.git
cd build-buddy
```

### Step 2: Install Dependencies

```bash
cd build-buddy-app
npm install
```

### Step 3: Configure Algolia

1. Create free Algolia account at https://www.algolia.com/users/sign_up
2. Get your API credentials from Dashboard → Settings → API Keys
3. Create `.env` file:

```env
VITE_ALGOLIA_APP_ID=your_app_id
VITE_ALGOLIA_SEARCH_KEY=your_search_api_key
VITE_ALGOLIA_AGENT_ID=your_agent_id
```

### Step 4: Upload Component Data

```bash
# Upload PC components to Algolia indices
npm run upload-data
```

This will populate 8 indices with PC component data.

### Step 5: Configure Agent Studio

1. Go to Algolia Dashboard → Generative AI Experiences → Agent Studio
2. Create new agent: "Build Buddy PC Compatibility Agent"
3. Configure with system prompt (see above)
4. Enable all 8 component indices as retrieval sources
5. Publish agent and copy Agent ID

### Step 6: Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

---

## 🎨 How It Works

### User Flow

1. **Select CPU** → Agent validates socket type
2. **Select Motherboard** → Agent checks CPU socket compatibility, suggests DDR type
3. **Select RAM** → Agent verifies DDR compatibility with motherboard
4. **Select GPU** → Agent checks case clearance and PSU requirements
5. **Select PSU** → Agent validates total system power requirements
6. **Select Case** → Agent verifies form factor and component clearances
7. **Select Cooler** → Agent checks socket support and height clearance
8. **Select Storage** → Agent verifies interface compatibility

### Compatibility Validation Rules

**CPU ↔ Motherboard**
- Socket type must match (AM5, LGA1700, etc.)
- Chipset compatibility
- TDP within motherboard limits

**RAM ↔ Motherboard**
- DDR generation (DDR4 vs DDR5)
- Speed support
- Capacity limits

**GPU ↔ Case + PSU**
- Physical length vs case clearance
- PSU wattage requirements
- PCIe connector availability

**Cooler ↔ CPU + Case**
- Socket compatibility
- TDP cooling capacity
- Height clearance for air coolers
- Radiator support for AIOs

**Total System Power**
- CPU TDP + GPU TDP + 100W overhead
- PSU must exceed with 20% headroom

---

## 🌟 Why This Approach is Unique

### Non-Conversational Intelligence

Unlike traditional chatbots that require explicit questions, Build Buddy:

- ✅ **Works within the existing workflow** - No separate chat interface
- ✅ **Proactively prevents errors** - Warns before incompatibilities occur
- ✅ **Shows, don't tell** - Visual compatibility indicators
- ✅ **Contextually aware** - Understands the entire build state

### Algolia Agent Studio Advantages

- **Fast Retrieval:** Sub-50ms searches across 8 indices
- **Business Logic:** Custom compatibility rules in prompts
- **Scalability:** Production-ready infrastructure
- **Accuracy:** Grounded in real component data, not hallucinations

---

## 📊 Component Data

### Sample Components Included

- **4 CPUs:** AMD Ryzen 7000 series, Intel 12th/13th/14th gen
- **4 Motherboards:** B650, Z790, X670E chipsets
- **4 GPUs:** RTX 4090, RX 7900 XTX, RTX 4070 Super, RX 7600
- **4 RAM kits:** DDR5 and DDR4 options
- **4 PSUs:** 650W to 1000W, 80+ Gold
- **4 Cases:** Mid-tower ATX with varying clearances
- **4 Coolers:** Air and AIO options
- **4 Storage drives:** NVMe SSDs and HDDs

Total: **32 components** with full compatibility metadata

---

## 🚢 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables

Set in Vercel dashboard:
- `VITE_ALGOLIA_APP_ID`
- `VITE_ALGOLIA_SEARCH_KEY`
- `VITE_ALGOLIA_AGENT_ID`

---

## 🎬 Demo

🔗 **Live Demo:** [build-buddy.vercel.app](https://build-buddy.vercel.app)

### Test Scenarios

**Compatible Build:**
1. Select: AMD Ryzen 7 7800X3D (AM5)
2. Select: MSI MAG B650 TOMAHAWK (AM5)
3. Select: G.Skill Trident Z5 32GB DDR5
4. Result: ✅ All compatible!

**Incompatible Build:**
1. Select: AMD Ryzen 7 7800X3D (AM5)
2. Select: ASUS ROG Strix Z790-E (LGA1700)
3. Result: ⚠️ Socket mismatch error

**Clearance Issue:**
1. Select: NVIDIA RTX 4090 (304mm)
2. Select: NZXT H510 Flow (365mm clearance)
3. Result: ⚡ Tight fit warning

---

## 🏆 Challenge Alignment

### Use of Underlying Technology
- ✅ Multi-index Algolia search
- ✅ Agent Studio for intelligent orchestration
- ✅ Custom tools and compatibility rules
- ✅ Real-time retrieval augmented generation (RAG)

### Usability and User Experience
- ✅ Intuitive component selection interface
- ✅ Visual compatibility indicators
- ✅ Proactive warnings without conversation
- ✅ Clear error messages with specific details

### Originality and Creativity
- ✅ Unique non-conversational agent use case
- ✅ Complex multi-dimensional compatibility checking
- ✅ Novel application of Agent Studio to workflow enhancement
- ✅ Demonstrates sophisticated data modeling

---

## 🔮 Future Enhancements

- [ ] Add more component categories (monitors, peripherals)
- [ ] Expand component database (100+ components per category)
- [ ] Build templates (Gaming, Workstation, Budget)
- [ ] Price history and deal alerts
- [ ] Performance benchmarking predictions
- [ ] Part availability checking
- [ ] Build sharing and community ratings

---

## 📄 License

MIT

---

## 👨‍💻 Author

Built for the **Algolia Agent Studio Challenge** by [Your Name]

**Technologies:** React, Vite, Algolia Agent Studio, OpenAI GPT-4

**Powered by:** Algolia's 1.75 trillion yearly searches and sub-50ms global retrieval

---

## 🙏 Acknowledgments

- Algolia for Agent Studio and incredible search infrastructure
- DEV Community for hosting the challenge
- PC building community for compatibility insights
# build-buddy
