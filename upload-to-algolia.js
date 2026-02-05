// upload-to-algolia.js
// Works with Algolia JavaScript SDK v4 and v5
require('dotenv').config();

// Load component data
const componentsData = require('./pc-components-data');

async function uploadData() {
  console.log('🚀 Starting data upload to Algolia...\n');

  let client;
  
  try {
    // Try to load Algolia SDK
    const algoliasearch = require('algoliasearch');
    
    // Check if it's v4 or v5 based on the function signature
    if (typeof algoliasearch === 'function') {
      // This works for both v4 and v5
      client = algoliasearch(
        process.env.ALGOLIA_APP_ID,
        process.env.ALGOLIA_ADMIN_API_KEY
      );
      console.log('✅ Connected to Algolia\n');
    } else if (algoliasearch.default) {
      // ES Module default export
      client = algoliasearch.default(
        process.env.ALGOLIA_APP_ID,
        process.env.ALGOLIA_ADMIN_API_KEY
      );
      console.log('✅ Connected to Algolia (ES Module)\n');
    } else {
      throw new Error('Unable to initialize Algolia client. Please check your algoliasearch package version.');
    }

  } catch (error) {
    console.error('❌ Error loading Algolia SDK:', error.message);
    console.error('\nPlease install the Algolia SDK:');
    console.error('  npm install algoliasearch@4');
    process.exit(1);
  }

  try {
    // Helper function to handle both v4 and v5 API
    async function uploadToIndex(indexName, objects, settings) {
      console.log(`📤 Uploading ${indexName}...`);
      
      const index = client.initIndex(indexName);
      
      // Upload objects
      await index.saveObjects(objects);
      console.log(`✅ Uploaded ${objects.length} records to ${indexName}`);
      
      // Set index settings
      if (settings) {
        await index.setSettings(settings);
      }
    }

    // Upload CPUs
    await uploadToIndex('pc_cpus', componentsData.cpus, {
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
    await uploadToIndex('pc_motherboards', componentsData.motherboards, {
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
    await uploadToIndex('pc_gpus', componentsData.gpus, {
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
    await uploadToIndex('pc_ram', componentsData.ram, {
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
    await uploadToIndex('pc_psus', componentsData.psus, {
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
    await uploadToIndex('pc_cases', componentsData.cases, {
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
    await uploadToIndex('pc_coolers', componentsData.coolers, {
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
    await uploadToIndex('pc_storage', componentsData.storage, {
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

    console.log('\n🎉 Setup complete! Ready to create Agent in Agent Studio.');
    console.log('\nNext steps:');
    console.log('1. Go to Algolia Dashboard → Generative AI Experiences → Agent Studio');
    console.log('2. Create a new agent');
    console.log('3. Select Google Gemini 1.5 Flash as LLM provider');
    console.log('4. Add your Google AI API key from https://aistudio.google.com/');
    
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ Error uploading data:', error.message);
    console.error('\nFull error:', error);
    console.error('\n🔍 Troubleshooting:');
    console.error('1. Check your .env file exists and has:');
    console.error('   ALGOLIA_APP_ID=your_app_id');
    console.error('   ALGOLIA_ADMIN_API_KEY=your_admin_key');
    console.error('2. Verify API keys in Algolia Dashboard → Settings → API Keys');
    console.error('3. Make sure you\'re using the Admin API Key (not Search-Only)');
    console.error('4. Check if pc-components-data.js is in the same directory');
    process.exit(1);
  }
}

// Run upload
uploadData();