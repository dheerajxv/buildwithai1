import { DemoPreset } from '../types/agronomy';

export const DEMO_PRESETS: DemoPreset[] = [
  {
    id: 'demo-tomato-early-blight',
    title: 'Tomato Early Blight',
    cropType: 'Tomato',
    climate: 'Humid / High Rainfall',
    description: 'Target-board concentric lesions and yellow halos on mature lower tomato foliage.',
    badgeLabel: 'Fungal Infection',
    svgColor: '#DC2626',
    result: {
      id: 'demo-tomato-early-blight',
      timestamp: new Date().toISOString(),
      cropName: 'Tomato (Solanum lycopersicum)',
      varietyOrFamily: 'Solanaceae / Nightshade Family',
      healthStatus: 'diseased',
      severityLevel: 'moderate',
      confidencePercentage: 94,
      primaryDiagnosis: 'Tomato Early Blight (Alternaria solani)',
      scientificPathogenName: 'Alternaria solani',
      summaryText: 'Classic target-board concentric ring lesions detected on lower foliage with pronounced yellow chlorotic halos. Left unaddressed, defoliation spreads rapidly upward, exposing developing tomatoes to sunscald and stem rot.',
      symptoms: [
        'Circular brown spots with distinctive concentric rings ("target-board" appearance)',
        'Chlorotic yellow halos surrounding necrotic lesion perimeters',
        'Lower senescence and yellowing of bottom leaf canopy leaves',
        'Small dark sunken spots beginning on lower stems'
      ],
      actionProtocol: [
        {
          stage: 'Phase 1: Canopy Sanitization',
          timeframe: '0 - 48 Hours',
          instructions: [
            'Prune all lower leaves showing target spots using sharp, sanitized shears (dip in 70% isopropyl alcohol)',
            'Immediately bag and discard pruned infected leaves off-site (do not add to home compost piles)',
            'Switch exclusively to ground drip or soaker hose irrigation to avoid splashing soil spores onto leaves'
          ]
        },
        {
          stage: 'Phase 2: Curative Bio/Chemical Treatment',
          timeframe: 'Day 3 - 7',
          instructions: [
            'Apply copper octanoate or copper sulphate hydroxide spray coating both top and bottom leaf surfaces',
            'Apply during calm morning or late afternoon to prevent thermal leaf burn',
            'Repeat at 7 to 10-day intervals, especially following rainfall events'
          ]
        },
        {
          stage: 'Phase 3: Soil Mulching & Defense',
          timeframe: 'Next 14 Days',
          instructions: [
            'Spread a 5-8 cm layer of clean straw, woodchips, or black plastic mulch under tomato plants',
            'Staking or trellising vines upright to maximize air circulation and sunshine exposure',
            'Ensure adequate potassium and calcium soil fertility to promote tissue repair'
          ]
        }
      ],
      treatments: {
        organic: [
          'Liquid Copper Fungicide (Copper Octanoate) - OMRI listed for organic production',
          'Bacillus subtilis (Serenade Garden) bio-fungicide foliar spray',
          'Potassium bicarbonate spray (3g/L water) to alter foliar pH and suppress fungal spore germination'
        ],
        chemical: [
          'Chlorothalonil (Daconil) broad-spectrum preventative protectant fungicide',
          'Mancozeb 75% WP contact protective fungicide applied at 2g per liter water',
          'Azoxystrobin (Quadris) systemic translaminar fungicide for severe outbreaks'
        ],
        safetyPrecautions: [
          'Wear waterproof gloves, protective eyewear, and long sleeves during spray preparation and application',
          'Comply strictly with Pre-Harvest Interval (PHI): 1 day for copper octanoate, 7 days for mancozeb',
          'Wash harvested tomatoes thoroughly with clean potable water prior to consumption'
        ]
      },
      yieldAdvisory: {
        riskAssessment: 'High foliar defoliation threat; severe early blight can cut tomato yield by more than a third due to lost photosynthetic area and sunscald.',
        projectedLossUntreated: '30% - 55% loss in total marketable fruit weight',
        recoveryTimeline: '7 - 10 days for new foliar flushes to stabilize without new target spots',
        futurePreventionTips: [
          'Practice a 3-year crop rotation (do not plant tomatoes, potatoes, eggplants, or peppers in same bed consecutively)',
          'Choose resistant cultivars (e.g., Mountain Supreme, Defiant PhR, Iron Lady)',
          'Ensure 60-90 cm plant spacing for vigorous airflow through canopy'
        ]
      }
    }
  },
  {
    id: 'demo-corn-leaf-blight',
    title: 'Corn Northern Leaf Blight',
    cropType: 'Corn / Maize',
    climate: 'Temperate Moderate',
    description: 'Elongated tan cigar-shaped lesions on maize foliage threatening upper ear canopy.',
    badgeLabel: 'Fungal Lesions',
    svgColor: '#D97706',
    result: {
      id: 'demo-corn-leaf-blight',
      timestamp: new Date().toISOString(),
      cropName: 'Maize (Zea mays)',
      varietyOrFamily: 'Poaceae / Field Corn',
      healthStatus: 'diseased',
      severityLevel: 'moderate',
      confidencePercentage: 92,
      primaryDiagnosis: 'Northern Corn Leaf Blight (Exserohilum turcicum)',
      scientificPathogenName: 'Exserohilum turcicum',
      summaryText: 'Moderate foliar blighting marked by long cigar-shaped elliptical tan lesions. High humidity and moderate temperatures foster conidia sporulation, endangering upper canopy photosynthetic capacity during silking.',
      symptoms: [
        'Characteristic elongated elliptical lesions (2.5 - 15 cm long) with smooth margins',
        'Tan-to-gray necrotic centers with olive-green dark fungal sporulation underneath',
        'Lesions coalescing across lower and mid-canopy leaves during wet periods',
        'Premature senescence of ear-leaf foliage'
      ],
      actionProtocol: [
        {
          stage: 'Phase 1: Immediate Field Assessment',
          timeframe: '0 - 48 Hours',
          instructions: [
            'Assess leaf damage on ear leaves (if >5% leaf area affected before silking, chemical intervention is warranted)',
            'Ensure spray equipment is calibrated for high pressure (40 psi) to penetrate dense canopy',
            'Avoid overhead sprinkler irrigation in late afternoon to reduce leaf wetness hours'
          ]
        },
        {
          stage: 'Phase 2: Targeted Foliar Spray',
          timeframe: 'Day 3 - 7',
          instructions: [
            'Apply strobilurin (QoI) or triazole (DMI) foliar fungicide at early tassel/silking',
            'Ensure complete spray coverage across upper third of crop canopy',
            'Monitor adjacent fields for spore dispersion vectors'
          ]
        },
        {
          stage: 'Phase 3: Residue & Rotation Control',
          timeframe: 'Post-Harvest',
          instructions: [
            'Deep tillage or chisel plow to bury infected crop residues exceeding 10 cm depth',
            'Implement minimum 1-year crop rotation with non-host legumes (soybeans) or brassicas'
          ]
        }
      ],
      treatments: {
        organic: [
          'Trichoderma harzianum bio-fungicide foliar drench at first sign of lesions',
          'Bacillus amyloliquefaciens strain D747 preventative canopy misting',
          'Potassium silicate foliar spray to reinforce epidermal cell wall strength'
        ],
        chemical: [
          'Azoxystrobin + Difenoconazole premix applied at 150-200 ml/acre',
          'Pyraclostrobin (Headline SC) at recommended label rates during VT-R1 stage',
          'Propiconazole (Tilt 250 EC) for rapid systemic curative action'
        ],
        safetyPrecautions: [
          'Wear chemical-resistant nitrile gloves, eye goggles, and half-face respirator with organic vapor cartridge',
          'Respect 30-day pre-harvest interval (PHI) for field corn forage and grain',
          'Do not apply within 25 feet of natural waterways or wetlands'
        ]
      },
      yieldAdvisory: {
        riskAssessment: 'High risk of grain yield penalty if disease advances above the primary ear leaf during kernel fill.',
        projectedLossUntreated: '25% - 40% reduction in test weight and total bushel yield',
        recoveryTimeline: 'Stabilization within 7 days; stops lesion expansion on newly formed foliage',
        futurePreventionTips: [
          'Select hybrid varieties possessing multi-genic or Ht1/Ht2/Ht3 genetic resistance',
          'Maintain minimum 75 cm row spacing to foster wind aeration through lower canopy',
          'Balance nitrogen fertilization with adequate potassium to avoid tender, vulnerable leaf tissues'
        ]
      }
    }
  },
  {
    id: 'demo-rice-bacterial-streak',
    title: 'Rice Bacterial Leaf Streak',
    cropType: 'Paddy Rice',
    climate: 'Tropical Monsoon',
    description: 'Narrow water-soaked interveinal amber streaks with bacterial exudate beads.',
    badgeLabel: 'Bacterial Disease',
    svgColor: '#CA8A04',
    result: {
      id: 'demo-rice-bacterial-streak',
      timestamp: new Date().toISOString(),
      cropName: 'Paddy Rice (Oryza sativa)',
      varietyOrFamily: 'Poaceae / Indica or Japonica',
      healthStatus: 'diseased',
      severityLevel: 'moderate',
      confidencePercentage: 89,
      primaryDiagnosis: 'Bacterial Leaf Streak (Xanthomonas oryzae pv. oryzicola)',
      scientificPathogenName: 'Xanthomonas oryzae pv. oryzicola',
      summaryText: 'Interveinal linear streaks with bacterial amber exudates along leaf blades. Favored by high rainfall, monsoon typhoons, and excessive nitrogen top-dressing.',
      symptoms: [
        'Narrow, water-soaked interveinal streaks turning yellowish-brown to dark orange',
        'Tiny amber-colored bacterial exudate beads on leaf surface under early morning dew',
        'Leaves turning grayish-white and drying prematurely from tip down',
        'Distinct limitation of lesion boundaries between longitudinal leaf veins'
      ],
      actionProtocol: [
        {
          stage: 'Phase 1: Field Water & Nitrogen Adjustment',
          timeframe: '0 - 48 Hours',
          instructions: [
            'Temporarily drain paddy standing water to 1-2 cm depth to lower canopy humidity',
            'Immediately halt all supplementary nitrogenous fertilizer top-dressings',
            'Disinfect field boots and equipment between infected and clean paddy sections'
          ]
        },
        {
          stage: 'Phase 2: Bactericidal Foliar Application',
          timeframe: 'Day 3 - 7',
          instructions: [
            'Spray copper hydroxide or copper oxychloride combined with agricultural streptomycin where permitted',
            'Apply during calm early morning hours after dew has evaporated',
            'Repeat at 7-day interval if persistent rainstorms persist'
          ]
        },
        {
          stage: 'Phase 3: Seed Treatment & Sanitation',
          timeframe: 'Next Planting Cycle',
          instructions: [
            'Hot water seed soaking at 53-54°C for 10-12 minutes prior to nursery germination',
            'Eradicate wild weed hosts (Leersia hexandra) along bunds and canals'
          ]
        }
      ],
      treatments: {
        organic: [
          'Pseudomonas fluorescens (20g/L) bio-bactericide foliar spray',
          'Neem cake extract (5%) foliar misting to inhibit bacterial proliferation',
          'Wood ash dusting across damp canopy at 15 kg/acre'
        ],
        chemical: [
          'Copper Hydroxide (Kocide 3000) at 1.5 - 2.0 kg/ha',
          'Kasugamycin 2% SL systemic bactericide at 400-500 ml/ha',
          'Validamycin 3% L combined spray for secondary sheath blight prevention'
        ],
        safetyPrecautions: [
          'Copper formulations can cause phytotoxicity if sprayed at excessive ambient temperatures (>35°C)',
          'Ensure downstream irrigation gates are closed during spray to prevent runoff into fish-rearing ponds',
          'Use face shield and waterproof boots during paddy spray walking'
        ]
      },
      yieldAdvisory: {
        riskAssessment: 'Moderate risk; impairs effective panicle photosynthesis and grain filling if flag leaf is infected.',
        projectedLossUntreated: '15% - 30% reduction in filled grain percentage',
        recoveryTimeline: '10 - 14 days for new emerging tiller leaves to establish clean growth',
        futurePreventionTips: [
          'Adopt split nitrogen application (3-4 splits) rather than heavy basal doses',
          'Plant certified disease-free treated seed stocks',
          'Practice alternate wetting and drying (AWD) water management regime'
        ]
      }
    }
  },
  {
    id: 'demo-wheat-healthy',
    title: 'Healthy Wheat Field Stage',
    cropType: 'Wheat',
    climate: 'Temperate Semi-Arid',
    description: 'Vibrant chlorophyll density, sturdy stems, and clean developing ear spikelets.',
    badgeLabel: 'Optimal Health',
    svgColor: '#059669',
    result: {
      id: 'demo-wheat-healthy',
      timestamp: new Date().toISOString(),
      cropName: 'Bread Wheat (Triticum aestivum)',
      varietyOrFamily: 'Poaceae / Winter or Spring Wheat',
      healthStatus: 'healthy',
      severityLevel: 'low',
      confidencePercentage: 97,
      primaryDiagnosis: 'Healthy Wheat Foliage & Early Head Emergence (Feekes 10.1)',
      scientificPathogenName: 'None / Physiological',
      summaryText: 'Excellent plant vigor with vibrant chlorophyll density, uniform leaf turgor, and zero evident necrotic or chlorotic lesions. Crop is transitioning smoothly into reproductive heading stage.',
      symptoms: [
        'Uniform emerald green pigmentation across flag leaf and lower canopy',
        'Sturdy erect stems with no stem rust pustules or lodging damage',
        'Intact leaf cuticles with healthy natural glaucous waxy bloom',
        'Normal ear emergence with symmetrical spikelet development'
      ],
      actionProtocol: [
        {
          stage: 'Phase 1: Heading Stage Nutrition',
          timeframe: 'Current Week',
          instructions: [
            'Maintain optimal soil moisture during anthesis to support grain fertilization',
            'Scout weekly for Fusarium head blight risk if warm rain coincides with flowering',
            'Conduct tissue test to verify micronutrient levels (Zinc, Boron)'
          ]
        },
        {
          stage: 'Phase 2: Preventative Surveillance',
          timeframe: 'Next 14 Days',
          instructions: [
            'Inspect flag leaves twice weekly for stripe rust (Puccinia striiformis) yellow stripes',
            'Monitor cereal aphids or armyworm thresholds along field margins'
          ]
        },
        {
          stage: 'Phase 3: Grain Fill Maturation',
          timeframe: 'Pre-Harvest',
          instructions: [
            'Plan harvest logistics once grain moisture approaches 13-14%',
            'Calibrate combine harvester to prevent cracked grain kernels'
          ]
        }
      ],
      treatments: {
        organic: [
          'Seaweed extract biostimulant (Ascophyllum nodosum) foliar spray to maximize grain weight',
          'Compost tea drench to support rhizosphere microbiology',
          'Beneficial insect refuges along field perimeter for natural aphid control'
        ],
        chemical: [
          'No curative fungicide required currently (zero pathogen pressure detected)',
          'Prophylactic triazole spray only if localized Fusarium weather alerts are issued'
        ],
        safetyPrecautions: [
          'Maintain regular scouting logs without unnecessary chemical spraying to preserve beneficial predatory insects',
          'Ensure safe tractor clearance height to prevent mechanical damage to emerging seed heads'
        ]
      },
      yieldAdvisory: {
        riskAssessment: 'Minimal risk; crop is in prime condition to achieve full regional yield potential.',
        projectedLossUntreated: '0% - 5% (Within baseline natural harvest variance)',
        recoveryTimeline: 'Currently optimal; expected harvest window in 35-45 days depending on thermal units',
        futurePreventionTips: [
          'Continue crop rotation with broadleaf pulses to sustain soil nitrogen balance',
          'Maintain balanced soil test-driven fertilization program',
          'Conserve residue cover for moisture retention and weed suppression'
        ]
      }
    }
  }
];
