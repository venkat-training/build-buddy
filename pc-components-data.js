// PC Components Database for Build Buddy
// Algolia Agent Studio Challenge

// ============================================
// CPUS
// ============================================
const cpus = [
  {
    objectID: "amd-ryzen-7-7800x3d",
    name: "AMD Ryzen 7 7800X3D",
    brand: "AMD",
    type: "cpu",
    socket: "AM5",
    tdp: 120,
    cores: 8,
    threads: 16,
    base_clock: 4.2,
    boost_clock: 5.0,
    price: 449,
    integrated_graphics: false,
    cooler_included: false,
    compatibility: {
      socket_type: "AM5",
      ddr_support: ["DDR5"],
      chipsets: ["X670E", "X670", "B650E", "B650"],
      min_psu_wattage: 105
    },
    use_cases: ["gaming", "content_creation", "streaming"],
    performance_tier: "high_end"
  },
  {
    objectID: "intel-core-i5-14600k",
    name: "Intel Core i5-14600K",
    brand: "Intel",
    type: "cpu",
    socket: "LGA1700",
    tdp: 125,
    cores: 14,
    threads: 20,
    base_clock: 3.5,
    boost_clock: 5.3,
    price: 319,
    integrated_graphics: true,
    cooler_included: false,
    compatibility: {
      socket_type: "LGA1700",
      ddr_support: ["DDR4", "DDR5"],
      chipsets: ["Z790", "Z690", "B760", "B660"],
      min_psu_wattage: 110
    },
    use_cases: ["gaming", "productivity", "budget_gaming"],
    performance_tier: "mid_range"
  },
  {
    objectID: "amd-ryzen-5-7600",
    name: "AMD Ryzen 5 7600",
    brand: "AMD",
    type: "cpu",
    socket: "AM5",
    tdp: 65,
    cores: 6,
    threads: 12,
    base_clock: 3.8,
    boost_clock: 5.1,
    price: 229,
    integrated_graphics: true,
    cooler_included: true,
    compatibility: {
      socket_type: "AM5",
      ddr_support: ["DDR5"],
      chipsets: ["X670E", "X670", "B650E", "B650"],
      min_psu_wattage: 65
    },
    use_cases: ["budget_gaming", "productivity", "office"],
    performance_tier: "mid_range"
  },
  {
    objectID: "intel-core-i9-14900k",
    name: "Intel Core i9-14900K",
    brand: "Intel",
    type: "cpu",
    socket: "LGA1700",
    tdp: 125,
    cores: 24,
    threads: 32,
    base_clock: 3.2,
    boost_clock: 6.0,
    price: 589,
    integrated_graphics: true,
    cooler_included: false,
    compatibility: {
      socket_type: "LGA1700",
      ddr_support: ["DDR4", "DDR5"],
      chipsets: ["Z790", "Z690"],
      min_psu_wattage: 150
    },
    use_cases: ["content_creation", "gaming", "workstation"],
    performance_tier: "enthusiast"
  }
];

// ============================================
// MOTHERBOARDS
// ============================================
const motherboards = [
  {
    objectID: "msi-mag-b650-tomahawk",
    name: "MSI MAG B650 TOMAHAWK WIFI",
    brand: "MSI",
    type: "motherboard",
    chipset: "B650",
    socket: "AM5",
    form_factor: "ATX",
    price: 219,
    ram_slots: 4,
    max_ram: 128,
    m2_slots: 2,
    pcie_slots: 3,
    compatibility: {
      cpu_socket: "AM5",
      ddr_type: "DDR5",
      ddr_max_speed: 6400,
      supported_cpus: ["AMD Ryzen 7000 Series"],
      max_tdp_support: 170
    },
    features: ["WiFi", "Bluetooth", "RGB"],
    use_cases: ["gaming", "productivity"]
  },
  {
    objectID: "asus-rog-strix-z790-e",
    name: "ASUS ROG Strix Z790-E Gaming",
    brand: "ASUS",
    type: "motherboard",
    chipset: "Z790",
    socket: "LGA1700",
    form_factor: "ATX",
    price: 429,
    ram_slots: 4,
    max_ram: 192,
    m2_slots: 4,
    pcie_slots: 4,
    compatibility: {
      cpu_socket: "LGA1700",
      ddr_type: "DDR5",
      ddr_max_speed: 7800,
      supported_cpus: ["Intel 12th/13th/14th Gen"],
      max_tdp_support: 250
    },
    features: ["WiFi", "Bluetooth", "RGB", "10G LAN"],
    use_cases: ["gaming", "content_creation", "enthusiast"]
  },
  {
    objectID: "gigabyte-b760-gaming-x",
    name: "GIGABYTE B760 Gaming X",
    brand: "GIGABYTE",
    type: "motherboard",
    chipset: "B760",
    socket: "LGA1700",
    form_factor: "ATX",
    price: 149,
    ram_slots: 4,
    max_ram: 128,
    m2_slots: 2,
    pcie_slots: 2,
    compatibility: {
      cpu_socket: "LGA1700",
      ddr_type: "DDR4",
      ddr_max_speed: 5333,
      supported_cpus: ["Intel 12th/13th/14th Gen"],
      max_tdp_support: 125
    },
    features: ["RGB"],
    use_cases: ["budget_gaming", "productivity"]
  },
  {
    objectID: "asrock-x670e-taichi",
    name: "ASRock X670E Taichi",
    brand: "ASRock",
    type: "motherboard",
    chipset: "X670E",
    socket: "AM5",
    form_factor: "ATX",
    price: 399,
    ram_slots: 4,
    max_ram: 128,
    m2_slots: 4,
    pcie_slots: 4,
    compatibility: {
      cpu_socket: "AM5",
      ddr_type: "DDR5",
      ddr_max_speed: 6600,
      supported_cpus: ["AMD Ryzen 7000 Series"],
      max_tdp_support: 170
    },
    features: ["WiFi", "Bluetooth", "RGB", "10G LAN"],
    use_cases: ["enthusiast", "content_creation"]
  }
];

// ============================================
// GRAPHICS CARDS (GPUs)
// ============================================
const gpus = [
  {
    objectID: "rtx-4090-fe",
    name: "NVIDIA GeForce RTX 4090 Founders Edition",
    brand: "NVIDIA",
    type: "gpu",
    chipset: "RTX 4090",
    vram: 24,
    vram_type: "GDDR6X",
    price: 1599,
    tdp: 450,
    length: 304,
    width: 61,
    slots: 3.5,
    compatibility: {
      pcie_version: "4.0",
      min_psu_wattage: 850,
      pcie_power_connectors: "1x 16-pin (12VHPWR)",
      recommended_case_clearance: 320
    },
    use_cases: ["4k_gaming", "content_creation", "ai_ml"],
    performance_tier: "enthusiast"
  },
  {
    objectID: "rx-7900-xtx",
    name: "AMD Radeon RX 7900 XTX",
    brand: "AMD",
    type: "gpu",
    chipset: "RX 7900 XTX",
    vram: 24,
    vram_type: "GDDR6",
    price: 999,
    tdp: 355,
    length: 287,
    width: 50,
    slots: 2.5,
    compatibility: {
      pcie_version: "4.0",
      min_psu_wattage: 750,
      pcie_power_connectors: "2x 8-pin",
      recommended_case_clearance: 300
    },
    use_cases: ["4k_gaming", "content_creation"],
    performance_tier: "high_end"
  },
  {
    objectID: "rtx-4070-super",
    name: "NVIDIA GeForce RTX 4070 SUPER",
    brand: "NVIDIA",
    type: "gpu",
    chipset: "RTX 4070 SUPER",
    vram: 12,
    vram_type: "GDDR6X",
    price: 599,
    tdp: 220,
    length: 267,
    width: 40,
    slots: 2,
    compatibility: {
      pcie_version: "4.0",
      min_psu_wattage: 650,
      pcie_power_connectors: "1x 16-pin (12VHPWR)",
      recommended_case_clearance: 280
    },
    use_cases: ["1440p_gaming", "content_creation"],
    performance_tier: "mid_range"
  },
  {
    objectID: "rx-7600",
    name: "AMD Radeon RX 7600",
    brand: "AMD",
    type: "gpu",
    chipset: "RX 7600",
    vram: 8,
    vram_type: "GDDR6",
    price: 269,
    tdp: 165,
    length: 204,
    width: 40,
    slots: 2,
    compatibility: {
      pcie_version: "4.0",
      min_psu_wattage: 500,
      pcie_power_connectors: "1x 8-pin",
      recommended_case_clearance: 220
    },
    use_cases: ["1080p_gaming", "budget_gaming"],
    performance_tier: "budget"
  }
];

// ============================================
// RAM (Memory)
// ============================================
const ram = [
  {
    objectID: "gskill-trident-z5-32gb",
    name: "G.Skill Trident Z5 RGB 32GB (2x16GB) DDR5-6000",
    brand: "G.Skill",
    type: "ram",
    capacity: 32,
    modules: 2,
    speed: 6000,
    ddr_type: "DDR5",
    cas_latency: "CL30",
    price: 129,
    compatibility: {
      ddr_generation: "DDR5",
      voltage: 1.35,
      jedec_compliant: true
    },
    features: ["RGB", "XMP 3.0"],
    use_cases: ["gaming", "content_creation"]
  },
  {
    objectID: "corsair-vengeance-32gb",
    name: "Corsair Vengeance 32GB (2x16GB) DDR4-3200",
    brand: "Corsair",
    type: "ram",
    capacity: 32,
    modules: 2,
    speed: 3200,
    ddr_type: "DDR4",
    cas_latency: "CL16",
    price: 74,
    compatibility: {
      ddr_generation: "DDR4",
      voltage: 1.35,
      jedec_compliant: true
    },
    features: ["XMP 2.0"],
    use_cases: ["gaming", "productivity", "budget_gaming"]
  },
  {
    objectID: "kingston-fury-beast-64gb",
    name: "Kingston FURY Beast 64GB (2x32GB) DDR5-5600",
    brand: "Kingston",
    type: "ram",
    capacity: 64,
    modules: 2,
    speed: 5600,
    ddr_type: "DDR5",
    cas_latency: "CL36",
    price: 219,
    compatibility: {
      ddr_generation: "DDR5",
      voltage: 1.25,
      jedec_compliant: true
    },
    features: ["XMP 3.0"],
    use_cases: ["content_creation", "workstation"]
  },
  {
    objectID: "teamgroup-vulcan-16gb",
    name: "Team T-Force Vulcan 16GB (2x8GB) DDR4-3600",
    brand: "Team",
    type: "ram",
    capacity: 16,
    modules: 2,
    speed: 3600,
    ddr_type: "DDR4",
    cas_latency: "CL18",
    price: 45,
    compatibility: {
      ddr_generation: "DDR4",
      voltage: 1.35,
      jedec_compliant: true
    },
    features: ["XMP 2.0"],
    use_cases: ["budget_gaming", "office"]
  }
];

// ============================================
// POWER SUPPLIES (PSUs)
// ============================================
const psus = [
  {
    objectID: "corsair-rm1000e",
    name: "Corsair RM1000e 1000W 80+ Gold",
    brand: "Corsair",
    type: "psu",
    wattage: 1000,
    efficiency: "80+ Gold",
    modular: "Fully Modular",
    price: 179,
    compatibility: {
      atx_version: "ATX 3.0",
      pcie_5_connector: true,
      pcie_connectors: 4,
      sata_connectors: 10,
      recommended_for_tdp: 750
    },
    use_cases: ["enthusiast", "high_end_gaming"],
    warranty_years: 10
  },
  {
    objectID: "evga-supernova-750-g6",
    name: "EVGA SuperNOVA 750 G6 750W 80+ Gold",
    brand: "EVGA",
    type: "psu",
    wattage: 750,
    efficiency: "80+ Gold",
    modular: "Fully Modular",
    price: 119,
    compatibility: {
      atx_version: "ATX 3.0",
      pcie_5_connector: true,
      pcie_connectors: 3,
      sata_connectors: 8,
      recommended_for_tdp: 550
    },
    use_cases: ["gaming", "mid_range"],
    warranty_years: 10
  },
  {
    objectID: "seasonic-focus-650",
    name: "Seasonic FOCUS GX-650 650W 80+ Gold",
    brand: "Seasonic",
    type: "psu",
    wattage: 650,
    efficiency: "80+ Gold",
    modular: "Fully Modular",
    price: 99,
    compatibility: {
      atx_version: "ATX 2.4",
      pcie_5_connector: false,
      pcie_connectors: 2,
      sata_connectors: 6,
      recommended_for_tdp: 450
    },
    use_cases: ["budget_gaming", "productivity"],
    warranty_years: 10
  },
  {
    objectID: "thermaltake-toughpower-850",
    name: "Thermaltake Toughpower GF3 850W 80+ Gold",
    brand: "Thermaltake",
    type: "psu",
    wattage: 850,
    efficiency: "80+ Gold",
    modular: "Fully Modular",
    price: 139,
    compatibility: {
      atx_version: "ATX 3.0",
      pcie_5_connector: true,
      pcie_connectors: 4,
      sata_connectors: 9,
      recommended_for_tdp: 650
    },
    use_cases: ["gaming", "content_creation"],
    warranty_years: 10
  }
];

// ============================================
// CASES
// ============================================
const cases = [
  {
    objectID: "lian-li-o11-dynamic-evo",
    name: "Lian Li O11 Dynamic EVO",
    brand: "Lian Li",
    type: "case",
    form_factor: "Mid Tower ATX",
    price: 159,
    dimensions: {
      length: 465,
      width: 272,
      height: 491
    },
    compatibility: {
      motherboard_support: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX"],
      gpu_clearance: 420,
      cpu_cooler_clearance: 167,
      psu_length: 225
    },
    features: ["Tempered Glass", "USB-C", "RGB"],
    use_cases: ["enthusiast", "rgb_build"]
  },
  {
    objectID: "fractal-meshify-2",
    name: "Fractal Design Meshify 2",
    brand: "Fractal Design",
    type: "case",
    form_factor: "Mid Tower ATX",
    price: 139,
    dimensions: {
      length: 542,
      width: 240,
      height: 474
    },
    compatibility: {
      motherboard_support: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX"],
      gpu_clearance: 400,
      cpu_cooler_clearance: 185,
      psu_length: 250
    },
    features: ["Tempered Glass", "USB-C", "Mesh Front"],
    use_cases: ["gaming", "airflow_focused"]
  },
  {
    objectID: "nzxt-h510-flow",
    name: "NZXT H510 Flow",
    brand: "NZXT",
    type: "case",
    form_factor: "Mid Tower ATX",
    price: 89,
    dimensions: {
      length: 428,
      width: 210,
      height: 460
    },
    compatibility: {
      motherboard_support: ["ATX", "Micro-ATX", "Mini-ITX"],
      gpu_clearance: 365,
      cpu_cooler_clearance: 165,
      psu_length: 180
    },
    features: ["Tempered Glass", "Cable Management"],
    use_cases: ["budget_gaming", "compact_build"]
  },
  {
    objectID: "corsair-4000d-airflow",
    name: "Corsair 4000D Airflow",
    brand: "Corsair",
    type: "case",
    form_factor: "Mid Tower ATX",
    price: 104,
    dimensions: {
      length: 466,
      width: 230,
      height: 453
    },
    compatibility: {
      motherboard_support: ["ATX", "Micro-ATX", "Mini-ITX"],
      gpu_clearance: 360,
      cpu_cooler_clearance: 170,
      psu_length: 220
    },
    features: ["Tempered Glass", "Mesh Front", "Cable Management"],
    use_cases: ["gaming", "value_build"]
  }
];

// ============================================
// CPU COOLERS
// ============================================
const coolers = [
  {
    objectID: "noctua-nh-d15",
    name: "Noctua NH-D15",
    brand: "Noctua",
    type: "cooler",
    cooling_type: "Air",
    height: 165,
    price: 119,
    compatibility: {
      sockets: ["AM5", "AM4", "LGA1700", "LGA1200"],
      tdp_rating: 250,
      ram_clearance_required: 64
    },
    use_cases: ["silent_build", "air_cooling"],
    features: ["Dual Fan", "Low Noise"]
  },
  {
    objectID: "arctic-liquid-freezer-360",
    name: "Arctic Liquid Freezer II 360",
    brand: "Arctic",
    type: "cooler",
    cooling_type: "AIO Liquid",
    radiator_size: 360,
    price: 119,
    compatibility: {
      sockets: ["AM5", "AM4", "LGA1700", "LGA1200"],
      tdp_rating: 300,
      radiator_length: 394,
      radiator_width: 120,
      radiator_thickness: 38
    },
    use_cases: ["high_performance", "overclocking"],
    features: ["RGB", "VRM Fan"]
  },
  {
    objectID: "deepcool-ak400",
    name: "DeepCool AK400",
    brand: "DeepCool",
    type: "cooler",
    cooling_type: "Air",
    height: 155,
    price: 34,
    compatibility: {
      sockets: ["AM5", "AM4", "LGA1700", "LGA1200"],
      tdp_rating: 220,
      ram_clearance_required: 40
    },
    use_cases: ["budget_gaming", "value_build"],
    features: ["Single Tower", "120mm Fan"]
  },
  {
    objectID: "corsair-h150i-elite",
    name: "Corsair iCUE H150i ELITE CAPELLIX",
    brand: "Corsair",
    type: "cooler",
    cooling_type: "AIO Liquid",
    radiator_size: 360,
    price: 189,
    compatibility: {
      sockets: ["AM5", "AM4", "LGA1700"],
      tdp_rating: 280,
      radiator_length: 397,
      radiator_width: 120,
      radiator_thickness: 27
    },
    use_cases: ["enthusiast", "rgb_build"],
    features: ["RGB", "Commander CORE"]
  }
];

// ============================================
// STORAGE
// ============================================
const storage = [
  {
    objectID: "samsung-990-pro-2tb",
    name: "Samsung 990 PRO 2TB NVMe SSD",
    brand: "Samsung",
    type: "storage",
    storage_type: "NVMe SSD",
    capacity: 2000,
    interface: "PCIe 4.0 x4",
    form_factor: "M.2 2280",
    price: 179,
    read_speed: 7450,
    write_speed: 6900,
    compatibility: {
      interface_type: "M.2 NVMe",
      pcie_gen: 4.0
    },
    use_cases: ["gaming", "content_creation"],
    warranty_years: 5
  },
  {
    objectID: "wd-black-sn850x-1tb",
    name: "WD BLACK SN850X 1TB NVMe SSD",
    brand: "Western Digital",
    type: "storage",
    storage_type: "NVMe SSD",
    capacity: 1000,
    interface: "PCIe 4.0 x4",
    form_factor: "M.2 2280",
    price: 89,
    read_speed: 7300,
    write_speed: 6300,
    compatibility: {
      interface_type: "M.2 NVMe",
      pcie_gen: 4.0
    },
    use_cases: ["gaming", "productivity"],
    warranty_years: 5
  },
  {
    objectID: "crucial-p3-plus-4tb",
    name: "Crucial P3 Plus 4TB NVMe SSD",
    brand: "Crucial",
    type: "storage",
    storage_type: "NVMe SSD",
    capacity: 4000,
    interface: "PCIe 4.0 x4",
    form_factor: "M.2 2280",
    price: 249,
    read_speed: 5000,
    write_speed: 4200,
    compatibility: {
      interface_type: "M.2 NVMe",
      pcie_gen: 4.0
    },
    use_cases: ["content_creation", "bulk_storage"],
    warranty_years: 5
  },
  {
    objectID: "seagate-barracuda-2tb",
    name: "Seagate Barracuda 2TB 7200RPM HDD",
    brand: "Seagate",
    type: "storage",
    storage_type: "HDD",
    capacity: 2000,
    interface: "SATA 6Gb/s",
    form_factor: "3.5 inch",
    price: 54,
    rpm: 7200,
    compatibility: {
      interface_type: "SATA",
      sata_gen: 3.0
    },
    use_cases: ["bulk_storage", "budget_build"],
    warranty_years: 2
  }
];

// Export all data
module.exports = {
  cpus,
  motherboards,
  gpus,
  ram,
  psus,
  cases,
  coolers,
  storage
};
