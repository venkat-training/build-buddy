/**
 * PC Component Compatibility Rules Engine
 * Build Buddy - Algolia Agent Studio Challenge
 */

class CompatibilityEngine {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.suggestions = [];
  }

  /**
   * Main validation function - checks entire build compatibility
   */
  validateBuild(build) {
    this.errors = [];
    this.warnings = [];
    this.suggestions = [];

    const { cpu, motherboard, gpu, ram, psu, case: pcCase, cooler, storage } = build;

    // CPU <-> Motherboard compatibility
    if (cpu && motherboard) {
      this.validateCPUMotherboard(cpu, motherboard);
    }

    // RAM <-> Motherboard compatibility
    if (ram && motherboard) {
      this.validateRAMMotherboard(ram, motherboard);
    }

    // GPU <-> Case compatibility
    if (gpu && pcCase) {
      this.validateGPUCase(gpu, pcCase);
    }

    // GPU <-> PSU compatibility
    if (gpu && psu) {
      this.validateGPUPSU(gpu, psu);
    }

    // Cooler <-> CPU compatibility
    if (cooler && cpu) {
      this.validateCoolerCPU(cooler, cpu);
    }

    // Cooler <-> Case compatibility
    if (cooler && pcCase) {
      this.validateCoolerCase(cooler, pcCase);
    }

    // Overall power consumption
    if (cpu && gpu && psu) {
      this.validateTotalPower(cpu, gpu, psu, build);
    }

    // Motherboard <-> Case compatibility
    if (motherboard && pcCase) {
      this.validateMotherboardCase(motherboard, pcCase);
    }

    // Storage <-> Motherboard compatibility
    if (storage && motherboard) {
      this.validateStorageMotherboard(storage, motherboard);
    }

    return {
      compatible: this.errors.length === 0,
      errors: this.errors,
      warnings: this.warnings,
      suggestions: this.suggestions
    };
  }

  /**
   * CPU <-> Motherboard Socket and Chipset Validation
   */
  validateCPUMotherboard(cpu, motherboard) {
    // Socket compatibility
    if (cpu.socket !== motherboard.socket) {
      this.errors.push({
        type: 'SOCKET_MISMATCH',
        component: 'CPU/Motherboard',
        message: `CPU socket ${cpu.socket} incompatible with motherboard socket ${motherboard.socket}`,
        severity: 'critical'
      });
    }

    // Chipset compatibility
    const cpuChipsets = cpu.compatibility.chipsets || [];
    if (!cpuChipsets.includes(motherboard.chipset)) {
      this.warnings.push({
        type: 'CHIPSET_WARNING',
        component: 'CPU/Motherboard',
        message: `CPU may have limited features with ${motherboard.chipset} chipset`,
        severity: 'warning'
      });
    }

    // TDP check
    if (cpu.tdp > motherboard.compatibility.max_tdp_support) {
      this.errors.push({
        type: 'TDP_EXCEEDED',
        component: 'CPU/Motherboard',
        message: `CPU TDP (${cpu.tdp}W) exceeds motherboard maximum (${motherboard.compatibility.max_tdp_support}W)`,
        severity: 'critical'
      });
    }
  }

  /**
   * RAM <-> Motherboard DDR Type Validation
   */
  validateRAMMotherboard(ram, motherboard) {
    // DDR generation compatibility
    if (ram.ddr_type !== motherboard.compatibility.ddr_type) {
      this.errors.push({
        type: 'DDR_MISMATCH',
        component: 'RAM/Motherboard',
        message: `${ram.ddr_type} RAM incompatible with motherboard ${motherboard.compatibility.ddr_type} slots`,
        severity: 'critical'
      });
    }

    // RAM speed check
    if (ram.speed > motherboard.compatibility.ddr_max_speed) {
      this.warnings.push({
        type: 'RAM_SPEED_LIMITATION',
        component: 'RAM/Motherboard',
        message: `RAM speed ${ram.speed}MHz exceeds motherboard maximum ${motherboard.compatibility.ddr_max_speed}MHz. Will run at lower speed.`,
        severity: 'info'
      });
    }

    // Capacity check
    if (ram.capacity > motherboard.max_ram) {
      this.errors.push({
        type: 'RAM_CAPACITY_EXCEEDED',
        component: 'RAM/Motherboard',
        message: `Total RAM ${ram.capacity}GB exceeds motherboard maximum ${motherboard.max_ram}GB`,
        severity: 'critical'
      });
    }
  }

  /**
   * GPU <-> Case Physical Clearance
   */
  validateGPUCase(gpu, pcCase) {
    const gpuLength = gpu.length;
    const caseClearance = pcCase.compatibility.gpu_clearance;

    if (gpuLength > caseClearance) {
      this.errors.push({
        type: 'GPU_TOO_LONG',
        component: 'GPU/Case',
        message: `GPU length ${gpuLength}mm exceeds case clearance ${caseClearance}mm`,
        severity: 'critical'
      });
    } else if (gpuLength > caseClearance - 20) {
      this.warnings.push({
        type: 'GPU_TIGHT_FIT',
        component: 'GPU/Case',
        message: `GPU will be a tight fit. Consider case with more clearance.`,
        severity: 'warning'
      });
    }
  }

  /**
   * GPU <-> PSU Power Validation
   */
  validateGPUPSU(gpu, psu) {
    const requiredWattage = gpu.compatibility.min_psu_wattage;
    const psuWattage = psu.wattage;

    if (psuWattage < requiredWattage) {
      this.errors.push({
        type: 'PSU_INSUFFICIENT',
        component: 'GPU/PSU',
        message: `GPU requires ${requiredWattage}W PSU minimum, but selected PSU is ${psuWattage}W`,
        severity: 'critical'
      });
    }

    // Check PCIe connectors for modern GPUs
    if (gpu.compatibility.pcie_power_connectors.includes('16-pin')) {
      if (!psu.compatibility.pcie_5_connector) {
        this.warnings.push({
          type: 'PCIE_CONNECTOR_WARNING',
          component: 'GPU/PSU',
          message: `GPU uses 16-pin connector. PSU may need an adapter.`,
          severity: 'warning'
        });
      }
    }
  }

  /**
   * Cooler <-> CPU Socket and TDP
   */
  validateCoolerCPU(cooler, cpu) {
    // Socket compatibility
    if (!cooler.compatibility.sockets.includes(cpu.socket)) {
      this.errors.push({
        type: 'COOLER_SOCKET_INCOMPATIBLE',
        component: 'Cooler/CPU',
        message: `Cooler does not support ${cpu.socket} socket`,
        severity: 'critical'
      });
    }

    // TDP cooling capacity
    if (cpu.tdp > cooler.compatibility.tdp_rating) {
      this.warnings.push({
        type: 'COOLER_INSUFFICIENT_TDP',
        component: 'Cooler/CPU',
        message: `CPU TDP ${cpu.tdp}W exceeds cooler rating ${cooler.compatibility.tdp_rating}W. May run hot.`,
        severity: 'warning'
      });
    }
  }

  /**
   * Cooler <-> Case Height Clearance
   */
  validateCoolerCase(cooler, pcCase) {
    if (cooler.cooling_type === 'Air') {
      const coolerHeight = cooler.height;
      const caseClearance = pcCase.compatibility.cpu_cooler_clearance;

      if (coolerHeight > caseClearance) {
        this.errors.push({
          type: 'COOLER_TOO_TALL',
          component: 'Cooler/Case',
          message: `Cooler height ${coolerHeight}mm exceeds case clearance ${caseClearance}mm`,
          severity: 'critical'
        });
      }
    }

    // AIO radiator space check
    if (cooler.cooling_type === 'AIO Liquid') {
      // This would need case radiator support info
      this.suggestions.push({
        type: 'VERIFY_RADIATOR_SUPPORT',
        component: 'Cooler/Case',
        message: `Verify case supports ${cooler.radiator_size}mm radiator mounting`,
        severity: 'info'
      });
    }
  }

  /**
   * Total System Power Calculation
   */
  validateTotalPower(cpu, gpu, psu, build) {
    let totalTDP = 0;

    // CPU power
    totalTDP += cpu.tdp || 0;

    // GPU power
    totalTDP += gpu.tdp || 0;

    // Add overhead for motherboard, RAM, storage, fans (~100W)
    totalTDP += 100;

    // PSU should have 20% headroom
    const recommendedPSU = Math.ceil(totalTDP * 1.2 / 50) * 50; // Round up to nearest 50W

    if (psu.wattage < totalTDP) {
      this.errors.push({
        type: 'PSU_TOTAL_INSUFFICIENT',
        component: 'PSU/System',
        message: `Total system power ~${totalTDP}W exceeds PSU capacity ${psu.wattage}W`,
        severity: 'critical'
      });
    } else if (psu.wattage < recommendedPSU) {
      this.warnings.push({
        type: 'PSU_LOW_HEADROOM',
        component: 'PSU/System',
        message: `PSU ${psu.wattage}W may have insufficient headroom. Recommended: ${recommendedPSU}W+`,
        severity: 'warning'
      });
    }

    this.suggestions.push({
      type: 'POWER_ESTIMATE',
      component: 'System',
      message: `Estimated total system power: ${totalTDP}W. Recommended PSU: ${recommendedPSU}W+`,
      severity: 'info'
    });
  }

  /**
   * Motherboard <-> Case Form Factor
   */
  validateMotherboardCase(motherboard, pcCase) {
    const supportedFormFactors = pcCase.compatibility.motherboard_support || [];
    const moboFormFactor = motherboard.form_factor;

    if (!supportedFormFactors.includes(moboFormFactor)) {
      this.errors.push({
        type: 'FORM_FACTOR_MISMATCH',
        component: 'Motherboard/Case',
        message: `Case does not support ${moboFormFactor} motherboards`,
        severity: 'critical'
      });
    }
  }

  /**
   * Storage <-> Motherboard Interface
   */
  validateStorageMotherboard(storage, motherboard) {
    // Check if motherboard has M.2 slots for NVMe drives
    if (storage.storage_type === 'NVMe SSD') {
      if (motherboard.m2_slots === 0) {
        this.errors.push({
          type: 'NO_M2_SLOTS',
          component: 'Storage/Motherboard',
          message: `Motherboard has no M.2 slots for NVMe SSD`,
          severity: 'critical'
        });
      }
    }
  }

  /**
   * Get alternative suggestions for incompatible components
   */
  getSuggestions(componentType, currentComponent, allComponents) {
    // This would query Algolia for compatible alternatives
    // For now, return placeholder
    return {
      type: 'ALTERNATIVE_SUGGESTION',
      message: `Consider compatible ${componentType} alternatives`
    };
  }
}

module.exports = CompatibilityEngine;
