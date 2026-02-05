# 🚀 Build Buddy - Deployment & Submission Checklist

## ✅ Pre-Deployment Checklist

### Phase 1: Algolia Setup (Complete This First!)
- [ ] Create free Algolia account at https://www.algolia.com/users/sign_up
- [ ] Select "Build Plan" (no credit card required)
- [ ] Get Application ID from Dashboard
- [ ] Get Admin API Key from Settings → API Keys
- [ ] Get Search-Only API Key

### Phase 2: Data Upload
- [ ] Install Node.js dependencies: `npm install algoliasearch dotenv`
- [ ] Create `.env` file with Algolia credentials
- [ ] Run upload script: `node upload-to-algolia.js`
- [ ] Verify 8 indices created in Algolia Dashboard
- [ ] Verify data uploaded (should see 32 total records)

### Phase 3: Agent Studio Configuration
- [ ] Navigate to Dashboard → Generative AI Experiences → Agent Studio
- [ ] Click "Create Agent"
- [ ] Name: "Build Buddy PC Compatibility Agent"
- [ ] Add system prompt (see ALGOLIA_SETUP_GUIDE.md)
- [ ] Enable all 8 indices as retrieval sources
- [ ] Configure LLM: OpenAI GPT-4
- [ ] Test agent with sample queries
- [ ] Publish agent
- [ ] Copy Agent ID

### Phase 4: Frontend Setup
- [ ] Navigate to `build-buddy-app` directory
- [ ] Run `npm install`
- [ ] Create `.env` file:
  ```
  VITE_ALGOLIA_APP_ID=your_app_id
  VITE_ALGOLIA_SEARCH_KEY=your_search_key
  VITE_ALGOLIA_AGENT_ID=your_agent_id
  # Optional: override Agent Studio endpoint (defaults to https://<APP_ID>.algolia.com)
  VITE_ALGOLIA_AGENT_BASE_URL=https://your_app_id.algolia.com
  ```
- [ ] Test locally: `npm run dev`
- [ ] Verify component selection works
- [ ] Verify compatibility checking works
- [ ] Test all error scenarios

---

## 🌐 Deployment Steps

### Option 1: Vercel (Recommended)

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Deploy
```bash
cd build-buddy-app
vercel
```

#### Step 3: Configure Environment Variables
In Vercel Dashboard → Settings → Environment Variables, add:
- `VITE_ALGOLIA_APP_ID`
- `VITE_ALGOLIA_SEARCH_KEY`
- `VITE_ALGOLIA_AGENT_ID`
- Optional: `VITE_ALGOLIA_AGENT_BASE_URL`

#### Step 4: Redeploy
```bash
vercel --prod
```

#### Step 5: Test Production Build
- Visit your Vercel URL
- Test all functionality
- Verify Agent Studio integration works

### Option 2: Netlify

#### Step 1: Build Production Bundle
```bash
npm run build
```

#### Step 2: Install Netlify CLI
```bash
npm install -g netlify-cli
```

#### Step 3: Deploy
```bash
netlify deploy --prod --dir=dist
```

#### Step 4: Add Environment Variables
In Netlify Dashboard → Site Settings → Environment Variables

### Option 3: GitHub Pages

#### Step 1: Update vite.config.js
```javascript
export default defineConfig({
  base: '/build-buddy/',
  // ... rest of config
})
```

#### Step 2: Build & Deploy
```bash
npm run build
npm run deploy # (requires gh-pages package)
```

---

## 📸 Create Demo Materials

### Screenshots Needed
- [ ] Homepage with component selection
- [ ] Compatible build with green checkmarks
- [ ] Incompatible build with error warnings
- [ ] Socket mismatch error example
- [ ] GPU clearance warning example
- [ ] Total price calculation
- [ ] Mobile responsive view

### Video Demo (Optional but Recommended)
- [ ] Record 60-90 second walkthrough
- [ ] Show component selection flow
- [ ] Demonstrate compatibility checking
- [ ] Show error warnings in action
- [ ] Highlight key features
- [ ] Upload to YouTube/Loom
- [ ] Add to DEV.to post

### Code Screenshots
- [ ] Agent Studio configuration
- [ ] Algolia indices dashboard
- [ ] Compatibility rules code

---

## 📝 DEV.to Submission

### Required Materials
- [ ] Cover image (1000x420px recommended)
- [ ] At least 2 screenshots
- [ ] Live demo URL
- [ ] GitHub repository (optional but recommended)
- [ ] Completed submission template

### Submission Template Sections
- [x] What I Built - Complete description
- [x] Demo - Live URL + screenshots
- [x] How I Used Algolia Agent Studio - Technical details
- [x] Why Fast Retrieval Matters - Performance analysis
- [ ] Cover image uploaded
- [ ] Screenshots uploaded
- [ ] Links verified

### Before Publishing
- [ ] Proofread entire post
- [ ] Verify all links work
- [ ] Check code formatting
- [ ] Ensure all images display correctly
- [ ] Add appropriate tags: `devchallenge, algoliachallenge, ai, agents`
- [ ] Preview post

### Submit to DEV.to
- [ ] Go to https://dev.to/new
- [ ] Use submission template (see DEV_SUBMISSION_POST.md)
- [ ] Add cover image
- [ ] Add screenshots
- [ ] Verify submission category: "Consumer-Facing Non-Conversational Experiences"
- [ ] Publish before **February 8, 2026 11:59 PM PST**

---

## 🧪 Testing Checklist

### Functionality Tests
- [ ] Component selection works for all 8 categories
- [ ] Price calculation updates correctly
- [ ] Remove component works
- [ ] Compatibility checking triggers on component addition

### Compatibility Tests
✅ **Socket Mismatch Test:**
- [ ] Select AMD Ryzen 7 7800X3D (AM5)
- [ ] Try ASUS Z790-E (LGA1700)
- [ ] Verify error appears

✅ **DDR Type Mismatch Test:**
- [ ] Select AM5 motherboard
- [ ] Try DDR4 RAM
- [ ] Verify error appears

✅ **GPU Clearance Test:**
- [ ] Select RTX 4090 (304mm)
- [ ] Select NZXT H510 Flow (365mm clearance)
- [ ] Verify warning appears (tight fit)

✅ **Compatible Build Test:**
- [ ] Build complete compatible system
- [ ] Verify all green checkmarks

### Cross-Browser Tests
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### Responsive Tests
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768px)
- [ ] Mobile (375px)

---

## 📊 Submission Requirements Verification

### From Challenge Rules
- [x] Integrates Algolia Agent Studio ✅
- [x] Demonstrates fast, relevant data retrieval ✅
- [x] Project is deployed and functional ✅
- [x] Uses free Build Plan (no credit card) ✅
- [x] Testing credentials provided (if needed) ✅

### Judging Criteria Alignment
- [x] **Use of Underlying Technology** - Multi-index Agent Studio ✅
- [x] **Usability and User Experience** - Intuitive, visual interface ✅
- [x] **Originality and Creativity** - Unique non-conversational approach ✅

---

## 🎯 Final Pre-Submit Checklist

### 24 Hours Before Deadline
- [ ] All code committed to GitHub
- [ ] Production deployment is live and tested
- [ ] All screenshots captured
- [ ] Video demo recorded (if doing one)
- [ ] DEV.to post drafted

### 2 Hours Before Deadline
- [ ] Final production test
- [ ] Verify all links in submission post
- [ ] Proofread submission one last time
- [ ] Have a friend/colleague test the live demo

### Submit!
- [ ] Publish DEV.to post
- [ ] Share on social media
- [ ] Notify team/friends
- [ ] Relax! 🎉

---

## 📞 Support Resources

### If You Get Stuck

**Algolia Discord:** https://discord.com/invite/algolia
- Ask questions in #agent-studio channel

**Algolia Documentation:**
- Agent Studio: https://www.algolia.com/doc/guides/algolia-ai/agent-studio
- InstantSearch: https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/js

**DEV Challenge FAQ:** https://dev.to/challenges/algolia-2026-01-07

---

## 🏆 Success Metrics

After submission, track:
- [ ] Demo URL traffic
- [ ] GitHub stars (if public)
- [ ] DEV.to post reactions
- [ ] Comments and feedback

---

## 💡 Tips for Success

1. **Deploy Early** - Don't wait until the last minute
2. **Test on Real Devices** - Mobile experience matters
3. **Screenshot Everything** - You'll need them for the post
4. **Show, Don't Tell** - Visual demos are powerful
5. **Explain Your Choices** - Why Agent Studio? Why this approach?
6. **Highlight Uniqueness** - What makes Build Buddy different?

---

## 🎉 Post-Submission

After publishing:
- [ ] Share post on Twitter/X with #AlgoliaChallenge
- [ ] Share in Algolia Discord
- [ ] Share on LinkedIn
- [ ] Email friends for feedback
- [ ] Watch for judge comments

---

**Good luck! You've got this! 🚀**

Remember: Deadline is **February 8, 2026 at 11:59 PM PST**
