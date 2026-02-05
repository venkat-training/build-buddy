# Algolia Setup Guide for Build Buddy

## Step 1: Create Free Algolia Account

1. Go to https://www.algolia.com/users/sign_up
2. Select "Build Plan" (Free - No credit card required)
3. Complete registration

## Step 2: Get API Credentials

1. In Algolia Dashboard, go to "Settings" → "API Keys"
2. Copy your:
   - Application ID
   - Admin API Key (for uploading data)
   - Search-Only API Key (for frontend)

## Step 3: Create Indices

Create 8 indices with these names:
- `pc_cpus`
- `pc_motherboards`
- `pc_gpus`
- `pc_ram`
- `pc_psus`
- `pc_cases`
- `pc_coolers`
- `pc_storage`

## Step 4: Upload Data Using This Script

Save your credentials in `.env`:
```
ALGOLIA_APP_ID=your_app_id
ALGOLIA_ADMIN_API_KEY=your_admin_key
```

Then run the upload script below.

---

## Data Upload Script

```javascript
// upload-to-algolia.js
const algoliasearch = require('algoliasearch');
const componentsData = require('./pc-components-data');

// Initialize Algolia client
const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_API_KEY
);

async function uploadData() {
  console.log('🚀 Starting data upload to Algolia...\n');

  // Upload CPUs
  const cpusIndex = client.initIndex('pc_cpus');
  await cpusIndex.saveObjects(componentsData.cpus);
  console.log('✅ Uploaded CPUs');

  // Configure searchable attributes for CPUs
  await cpusIndex.setSettings({
    searchableAttributes: [
      'name',
      'brand',
      'socket',
      'unordered(use_cases)',
      'unordered(compatibility.chipsets)'
    ],
    attributesForFaceting: [
      'searchable(brand)',
      'searchable(socket)',
      'searchable(use_cases)',
      'performance_tier',
      'integrated_graphics'
    ],
    customRanking: [
      'desc(cores)',
      'asc(price)'
    ]
  });

  // Upload Motherboards
  const motherboardsIndex = client.initIndex('pc_motherboards');
  await motherboardsIndex.saveObjects(componentsData.motherboards);
  console.log('✅ Uploaded Motherboards');

  await motherboardsIndex.setSettings({
    searchableAttributes: [
      'name',
      'brand',
      'chipset',
      'socket',
      'unordered(features)'
    ],
    attributesForFaceting: [
      'searchable(brand)',
      'searchable(chipset)',
      'searchable(socket)',
      'form_factor',
      'compatibility.ddr_type'
    ],
    customRanking: [
      'desc(m2_slots)',
      'asc(price)'
    ]
  });

  // Upload GPUs
  const gpusIndex = client.initIndex('pc_gpus');
  await gpusIndex.saveObjects(componentsData.gpus);
  console.log('✅ Uploaded GPUs');

  await gpusIndex.setSettings({
    searchableAttributes: [
      'name',
      'brand',
      'chipset',
      'unordered(use_cases)'
    ],
    attributesForFaceting: [
      'searchable(brand)',
      'performance_tier',
      'searchable(use_cases)'
    ],
    customRanking: [
      'desc(vram)',
      'asc(price)'
    ]
  });

  // Upload RAM
  const ramIndex = client.initIndex('pc_ram');
  await ramIndex.saveObjects(componentsData.ram);
  console.log('✅ Uploaded RAM');

  await ramIndex.setSettings({
    searchableAttributes: [
      'name',
      'brand',
      'ddr_type'
    ],
    attributesForFaceting: [
      'searchable(brand)',
      'ddr_type',
      'capacity'
    ],
    customRanking: [
      'desc(speed)',
      'asc(price)'
    ]
  });

  // Upload PSUs
  const psusIndex = client.initIndex('pc_psus');
  await psusIndex.saveObjects(componentsData.psus);
  console.log('✅ Uploaded PSUs');

  await psusIndex.setSettings({
    searchableAttributes: [
      'name',
      'brand',
      'efficiency'
    ],
    attributesForFaceting: [
      'searchable(brand)',
      'efficiency',
      'wattage',
      'modular'
    ],
    customRanking: [
      'desc(wattage)',
      'asc(price)'
    ]
  });

  // Upload Cases
  const casesIndex = client.initIndex('pc_cases');
  await casesIndex.saveObjects(componentsData.cases);
  console.log('✅ Uploaded Cases');

  await casesIndex.setSettings({
    searchableAttributes: [
      'name',
      'brand',
      'form_factor',
      'unordered(features)'
    ],
    attributesForFaceting: [
      'searchable(brand)',
      'form_factor',
      'searchable(features)'
    ],
    customRanking: [
      'desc(compatibility.gpu_clearance)',
      'asc(price)'
    ]
  });

  // Upload Coolers
  const coolersIndex = client.initIndex('pc_coolers');
  await coolersIndex.saveObjects(componentsData.coolers);
  console.log('✅ Uploaded Coolers');

  await coolersIndex.setSettings({
    searchableAttributes: [
      'name',
      'brand',
      'cooling_type',
      'unordered(compatibility.sockets)'
    ],
    attributesForFaceting: [
      'searchable(brand)',
      'cooling_type',
      'searchable(compatibility.sockets)'
    ],
    customRanking: [
      'desc(compatibility.tdp_rating)',
      'asc(price)'
    ]
  });

  // Upload Storage
  const storageIndex = client.initIndex('pc_storage');
  await storageIndex.saveObjects(componentsData.storage);
  console.log('✅ Uploaded Storage');

  await storageIndex.setSettings({
    searchableAttributes: [
      'name',
      'brand',
      'storage_type',
      'form_factor'
    ],
    attributesForFaceting: [
      'searchable(brand)',
      'storage_type',
      'capacity',
      'interface'
    ],
    customRanking: [
      'desc(read_speed)',
      'asc(price)'
    ]
  });

  console.log('\n✨ All data uploaded successfully!');
  console.log('📊 Total records uploaded:');
  console.log(`   - CPUs: ${componentsData.cpus.length}`);
  console.log(`   - Motherboards: ${componentsData.motherboards.length}`);
  console.log(`   - GPUs: ${componentsData.gpus.length}`);
  console.log(`   - RAM: ${componentsData.ram.length}`);
  console.log(`   - PSUs: ${componentsData.psus.length}`);
  console.log(`   - Cases: ${componentsData.cases.length}`);
  console.log(`   - Coolers: ${componentsData.coolers.length}`);
  console.log(`   - Storage: ${componentsData.storage.length}`);
}

// Run upload
uploadData()
  .then(() => {
    console.log('\n🎉 Setup complete! Ready to create Agent in Agent Studio.');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Error uploading data:', error);
    process.exit(1);
  });
```

## Step 5: Configure Agent Studio

1. In Algolia Dashboard, go to "Generative AI Experiences" → "Agent Studio"
2. Click "Create Agent"
3. Configure:
   - **Name:** Build Buddy PC Compatibility Agent
   - **Purpose:** Help users build compatible PC configurations
   - **LLM Provider:** OpenAI GPT-4
   
4. **System Prompt:**
```
You are Build Buddy, an expert PC building assistant. Your role is to help users create compatible computer builds by:

1. Understanding component compatibility rules
2. Searching across multiple Algolia indices (pc_cpus, pc_motherboards, pc_gpus, pc_ram, pc_psus, pc_cases, pc_coolers, pc_storage)
3. Proactively warning about incompatibilities BEFORE they become problems
4. Suggesting compatible alternatives when conflicts are detected
5. Considering budget constraints and use cases

CRITICAL COMPATIBILITY RULES:
- CPU socket MUST match motherboard socket (AM5, LGA1700, etc.)
- RAM DDR type MUST match motherboard (DDR4 vs DDR5)
- GPU length must fit within case clearance
- PSU wattage must exceed total system power (CPU TDP + GPU TDP + 100W overhead + 20% headroom)
- CPU cooler must support CPU socket AND fit within case height clearance
- Motherboard form factor must be supported by case

When a user selects a component, immediately check compatibility with their existing selections and warn of any issues. Provide specific measurements and recommendations.

Always be proactive, not reactive. Prevent incompatible builds before they happen.
```

5. **Tools Configuration:**
   - Enable all 8 indices as retrieval sources
   - Configure multi-index search

## Step 6: Test Your Agent

Test queries:
- "I want to build a gaming PC with a Ryzen 7 7800X3D"
- "Will the RTX 4090 fit in the NZXT H510 Flow case?"
- "What motherboard is compatible with Intel i5-14600K?"
- "I have DDR4 RAM, which motherboards support it?"

## Step 7: Get API Endpoint

After publishing your agent, you'll receive:
- Agent ID
- API endpoint for integration
- Sample code for Vercel AI SDK

---

## Installation Commands

```bash
# Install dependencies
npm init -y
npm install algoliasearch dotenv

# Create .env file
echo "ALGOLIA_APP_ID=your_app_id_here" > .env
echo "ALGOLIA_ADMIN_API_KEY=your_admin_key_here" >> .env

# Run upload script
node upload-to-algolia.js
```

---

## Next Steps After Algolia Setup

1. ✅ Data uploaded to 8 indices
2. ✅ Agent configured in Agent Studio
3. 🔄 Build React frontend
4. 🔄 Integrate Agent Studio API
5. 🔄 Deploy to Vercel
6. 🔄 Submit to DEV Challenge
