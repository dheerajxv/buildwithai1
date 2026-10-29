# AgriSmart: Multimodal Crop Health Doctor & Yield Advisor

AgriSmart is an intelligent agronomy diagnosis and yield optimization web application designed for the "Build with AI" hackathon. It empowers farmers, agronomists, and agricultural extension workers to upload or capture photos of crops, leaves, fruits, or soil, receiving instantaneous structured diagnoses, pathogen identification, step-by-step treatment protocols, and preventative yield advisory powered by Gemini multimodal vision.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following parameters were confirmed during the interactive clarification phase:

- **Confirmed Application Concept**: AgriSmart — Multimodal Crop Health Doctor & Yield Advisor.
- **Confirmed Aesthetic & Palette**: Lavender and Slate modern hackathon palette (`#7C3AED` / `#8B5CF6` lavender accents, `#0F172A` deep slate text, `#F8FAFC` soft off-white surface, `#EDE9FE` subtle lavender tinting, `#059669` botanical green indicators).
- **Confirmed Gemini Highlight**: Multimodal photo analysis with structured step-by-step cards, pathogen taxonomy, confidence indicators, severity ratings, and actionable recovery procedures.
- **Confirmed Key Extra Capabilities**: One-click instant example gallery (judge demo mode), local inspection history persistence, and single-click copy/download formatted agronomy report.

---

## 1. Overview & Core Concept

- **What It Does**: AgriSmart transforms smartphone or field camera photos of stressed, infected, or damaged crops into precision agronomy intelligence. It analyzes visual symptoms, identifies diseases/deficiencies/pests, determines severity, and generates concrete organic and chemical intervention steps with timeline estimates and yield protection tips.
- **Target Audience / Persona**: Smallholder farmers, agricultural extension officers, greenhouse operators, and urban gardeners who need immediate, reliable diagnostic support without waiting days for laboratory soil/leaf assays.
- **Key Value**: Drastically reduces crop loss through early pest and disease detection, guides responsible pesticide/fertilizer application, and provides demo judges with instant 1-click test cases for quick evaluation.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Landing & Demo Fast-Track**:
   - Clean, uncluttered header with AgriSmart wordmark, navigation anchors, and a "Run Demo" button.
   - Quick one-line mission kicker followed directly by the primary inspection workbench.
   - **"Try Example" Quick-Picks**: 4 preloaded field scenarios (e.g., *Tomato Early Blight*, *Corn Northern Leaf Blight*, *Rice Bacterial Leaf Streak*, *Healthy Wheat Stage*) with realistic high-res crop imagery and instant analysis triggers for judges.
2. **Field Capture & Image Upload**:
   - Drag-and-drop or file upload zone supporting JPEG, PNG, and WebP formats.
   - Camera trigger for mobile devices.
   - Optional contextual parameters: Crop type, growth stage, observed climate/weather condition (e.g., humid, drought, heavy rainfall).
3. **Structured Diagnostic Cards**:
   - **Crop Identification & Health Status**: Detected crop variety, overall health index, infection severity rating (Mild, Moderate, Severe, Critical).
   - **Pathogen & Symptom Breakdown**: Primary diagnosis, biological agent name, secondary symptoms, and visual marker explanations.
   - **Step-by-Step Action Protocol**: Chronological intervention guide divided into *Immediate Mitigation (0–48 hrs)*, *Targeted Treatment (Day 3–7)*, and *Preventative Maintenance*.
   - **Organic vs. Chemical Options**: Clear dual-track treatment options with dosage guidelines and safety precautions.
   - **Yield Impact Advisory**: Projected yield reduction if untreated vs. expected recovery rate with timely intervention.
4. **Export & History Drawer**:
   - Single-click clipboard copy of the structured agronomy diagnosis report in Markdown format.
   - Formatted report download (printable HTML/text agronomy bulletin).
   - LocalStorage inspection log with timestamp, crop badge, and rapid re-view capability.

### Visual Identity & Theme
- **Aesthetic Direction**: Modern hackathon aesthetic pairing high-precision agricultural telemetry with calm, elegant Lavender and Slate tones. Clean, unboxed metadata without pill sandwiches.
- **Color Palette**:
  - Dominant Neutral Canvas (60%): `#F8FAFC` (Slate-50) and `#FFFFFF` (Pure White).
  - Structural Surfaces (30%): `#F1F5F9` (Slate-100), `#E2E8F0` (Slate-200 hairline borders), `#1E293B` (Slate-800 typography).
  - Lavender Accent Budget (10%): `#7C3AED` (Deep Violet CTA), `#8B5CF6` (Lavender interactive highlight), `#EDE9FE` (Lavender-100 hover and focus rings).
  - Semantic Status: `#059669` (Botanical Emerald for healthy/recovered), `#D97706` (Amber warning), `#DC2626` (Rose critical).
- **Typography & Hierarchy**:
  - Primary Display & Headings: `Plus Jakarta Sans` / `Outfit` with crisp tracking.
  - Body Prose: Clean, comfortable `Plus Jakarta Sans` at 15–16px.
  - Field Metrics & Timestamps: Tabular figures (`tabular-nums font-mono`) for precision figures and severity ratings.
- **Layout Math**: Desktop baseline 1440px with responsive grid; asymmetric split between the image preview & parameter inspector on the left and the diagnostic output cards on the right.

---

## 3. Key Product Decisions & Trade-Offs

- **Server-Side Gemini Execution**:
  - *Chosen Approach*: Node.js Express server route (`/api/analyze-crop`) invoking `@google/genai` with model `gemini-3.8-flash` using `responseSchema` (structured JSON) and multimodal inline image data.
  - *Why*: Strict security (API key kept on server), reliable JSON validation, and fast response times suitable for hackathon judging.
  - *Alternatives Considered*: Client-side SDK calls (rejected due to API key exposure and CORS restrictions).
- **Structured JSON Schema Output**:
  - *Chosen Approach*: Force Gemini to return an exact TypeScript-compatible schema (`diagnosis`, `pathogen`, `severity`, `confidenceScore`, `symptoms`, `actionSteps`, `organicRemedies`, `chemicalTreatments`, `yieldAdvisory`).
  - *Why*: Guarantees predictable card layouts and eliminates markdown formatting inconsistencies.
- **Offline / Judge-Friendly Local Fallbacks**:
  - *Chosen Approach*: Robust pre-cached diagnostic models for the 4 demo examples if the API key is unavailable or rate-limited, paired with live Gemini processing for custom image uploads.
  - *Why*: Ensures hackathon judges never experience a broken or unresponsive interface during live demos.

---

## 4. Technical Architecture & Data Strategy

### Architecture & Component Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                        BROWSER CLIENT (React 19)                       │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ TopBar: AgriSmart Wordmark · Nav Anchors · Demo Fast-Action      │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│  ┌───────────────────────────────┐  ┌────────────────────────────────┐ │
│  │ Left Console: Image & Context │  │ Right Console: Diagnosis Cards │ │
│  │ • Drag & Drop / File Input    │  │ • Primary Diagnosis Header     │ │
│  │ • 4 Instant Demo Presets      │  │ • Severity & Health Meter      │ │
│  │ • Crop & Climate Selector     │  │ • Symptoms & Observations      │ │
│  │ • Analyze Field Sample Button │  │ • Step-by-Step Action Protocol │ │
│  │                               │  │ • Organic & Chemical Remedies  │ │
│  │                               │  │ • Yield Advisory & Prevention  │ │
│  │                               │  │ • Copy Report / Export Action  │ │
│  └───────────────────────────────┘  └────────────────────────────────┘ │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ History Drawer: Recent Field Inspections (LocalStorage Store)    │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                         POST /api/analyze-crop
                         { imageBase64, mimeType, cropType, climate }
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      EXPRESS SERVER (server.ts)                        │
│                                                                        │
│  • Validates payload (base64 image data + optional agronomy metadata)  │
│  • Initializes GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })     │
│  • Model: 'gemini-3.8-flash'                                           │
│  • Schema: responseSchema (Type.OBJECT with structured diagnosis)      │
│  • System Instruction: "Expert Agronomist & Plant Pathologist"        │
└────────────────────────────────────────────────────────────────────────┘
```

### Data Model & Schemas

```ts
interface CropAnalysisResult {
  id: string;
  timestamp: string;
  cropName: string;
  varietyOrFamily?: string;
  healthStatus: "healthy" | "mild_stress" | "diseased" | "pest_infestation" | "nutrient_deficiency";
  severityLevel: "low" | "moderate" | "severe" | "critical";
  confidencePercentage: number;
  primaryDiagnosis: string;
  scientificPathogenName?: string;
  symptoms: string[];
  actionProtocol: {
    stage: string;
    timeframe: string;
    instructions: string[];
  }[];
  treatments: {
    organic: string[];
    chemical: string[];
    safetyPrecautions: string[];
  };
  yieldAdvisory: {
    riskAssessment: string;
    projectedLossUntreated: string;
    recoveryTimeline: string;
    futurePreventionTips: string[];
  };
  sampleImageUrl?: string;
}
```

### Interactive State Mapping
- `selectedExample`: Triggers immediate loading of high-definition sample photography and pre-populated metadata.
- `uploadedImage`: Handles local file reading via `FileReader`, creates preview blob, and formats base64 payload.
- `isAnalyzing`: Renders an interactive inspection radar state with progress indicators and cancel/retry options.
- `activeTab`: Switches between Diagnosis Overview, Action Protocol, Treatment Options, and Yield Advisory.
- `historyList`: Hydrates from and saves to `localStorage` key `agrismart_inspections`, with clear and recall capabilities.
- `copyFeedback`: Animated toast indicating report copied to clipboard.
