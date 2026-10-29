# AgriSmart · AI Crop Health Doctor & Yield Advisor

> An intelligent, multimodal agronomy diagnosis and yield protection web application built with **Google Gemini 3.8 Flash** for the **Build with AI Hackathon**.

[![Built with Gemini](https://img.shields.io/badge/AI-Google%20Gemini%203.8%20Flash-8B5CF6?style=flat&logo=google)](https://ai.google.dev/)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

---

## The Problem
Crop diseases and pest infestations destroy **20% to 40% of global agricultural yield annually**, costing the global economy over $220 billion. Smallholder farmers and extension officers often lack immediate access to certified plant pathologists. Laboratory soil and leaf assays can take days or weeks—meanwhile, aggressive fungal and bacterial blights spread throughout the canopy, causing devastating harvest loss.

## The Solution: AgriSmart
**AgriSmart** turns any smartphone or field camera into an instant clinical crop pathology laboratory. Farmers capture or upload a close-up photo of infected leaves, stems, or fruits. Powered by **Gemini 3.8 Flash multimodal vision**, AgriSmart returns:
1. **Biological Pathogen Identification**: Clinical diagnosis with Latin binomial classification (e.g., *Alternaria solani*, *Exserohilum turcicum*, *Xanthomonas oryzae*).
2. **Field Severity & Confidence Index**: Quantitative scoring using tabular figures.
3. **Chronological Action Protocol**: 3-phase containment roadmap (*Phase 1: 0–48 Hours*, *Phase 2: Day 3–7*, *Phase 3: Prevention & Rotation*).
4. **Dual-Track Treatments**: Practical split between **Track A (Organic/Biological)** and **Track B (Targeted Chemical)** interventions, complete with active ingredient names and PPE safety precautions.
5. **Yield Protection Advisory**: Untreated crop loss projections and realistic recovery timelines.

---

## Core Features

- **Multimodal Specimen Upload**: Drag-and-drop image upload or live mobile camera capture for field scouting.
- **Contextual Agronomy Filters**: Set crop category hints (Tomato, Corn, Rice, Wheat, Potato, Soybeans, Citrus, Apple) and field weather/climate parameters (Humid, Temperate, Tropical Monsoon, Arid).
- **1-Click Judge Demo Scenarios**: 4 pre-calibrated field cases (*Tomato Early Blight*, *Corn Northern Leaf Blight*, *Rice Bacterial Leaf Streak*, and *Healthy Wheat Stage*) for instant evaluation without typing.
- **Strict Structured JSON Schema**: Zero hallucinated formatting; all responses strictly conform to typed schemas via Gemini's `responseSchema`.
- **Export & Copy Utility**: 1-click Markdown clinical report copy to clipboard and downloadable formatted diagnostic bulletin (`.txt`).
- **Local Inspection History**: Saves past scans in browser `localStorage` for offline review and progress tracking across growing seasons.
- **Zero-Broken-Image Resilience**: High-fidelity botanical vector illustrations render instantly if external images fail or network is restricted.

---

## How Gemini is Used

- **Model**: `gemini-3.8-flash`
- **Multimodal Input**: Transmits high-resolution image data as inline base64 alongside agronomy metadata.
- **System Instruction**: Enforces an authoritative "Senior Agricultural Pathologist & Extension Specialist" persona, eliminating conversational filler and focusing on practical field recovery.
- **Structured JSON (`responseSchema`)**: Leverages `@google/genai` with `Type.OBJECT`, `Type.ARRAY`, and nested properties to guarantee reliable UI card rendering.
- **Secure Server-Side Architecture**: Keeps the Gemini API key strictly server-side inside Node.js Express, with telemetry headers (`User-Agent: aistudio-build`).

---

## Architecture Flow

```
[ Smartphone / Camera / Browser ]
                │
         (Leaf Photo + Field Context)
                │
                ▼
      ┌───────────────────┐
      │  React 19 Client  │  (Lavender & Slate Aesthetic, Zero-Pill Design)
      └─────────┬─────────┘
                │ POST /api/analyze-crop
                ▼
      ┌───────────────────┐
      │  Express Backend  │  (server.ts)
      └─────────┬─────────┘
                │ GoogleGenAI SDK (User-Agent: aistudio-build)
                ▼
      ┌───────────────────┐
      │ Gemini 3.8 Flash  │  (Multimodal Vision + Structured JSON Schema)
      └─────────┬─────────┘
                │
                ▼
[ Structured Diagnosis · 3-Phase Action Steps · Organic/Chemical Protocol · Yield Advisory ]
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| **AI Model & SDK** | Google Gemini 3.8 Flash (`@google/genai` ^2.4.0) |
| **Frontend Framework** | React 19, TypeScript, Vite 8 |
| **Styling** | Tailwind CSS v4, Plus Jakarta Sans, JetBrains Mono |
| **Icons & Motion** | Lucide React, Motion |
| **Backend Server** | Node.js, Express, TSX |
| **Storage** | Client LocalStorage (Inspection History) |

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- A Gemini API Key from [Google AI Studio](https://aistudio.google.com/)

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/agrismart.git
cd agrismart
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the project root:
```bash
GEMINI_API_KEY="your-gemini-api-key-here"
PORT=3000
```

### 4. Run the development server
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

### 5. Build for production
```bash
npm run build
npm start
```

---

## Hackathon Demo Checklist for Judges

1. **Instant Demo Mode**: Click **"Run Judge Demo"** in the top navigation or choose any of the 4 demo presets to verify instant diagnosis with full card breakdowns.
2. **Live Image Analysis**: Upload any plant leaf image with the file picker or phone camera, choose the crop hint, and click **"Analyze Specimen with Gemini"**.
3. **Structured Card Inspection**:
   - Inspect **Symptoms & Markers**
   - Review the **Action Protocol** divided into chronological stages (0–48 hrs, Day 3–7, Prevention)
   - Toggle **Treatments & PPE** for organic and chemical dual tracks
   - Check **Yield & Risk** for projected loss percentages and recovery timelines
4. **Export & History**:
   - Click **"Copy Report"** (copies formatted Markdown)
   - Click **"Download"** (downloads clinical bulletin)
   - Click **"Inspection Log"** in the top bar to inspect saved past records.

---

## License
Distributed under the Apache 2.0 License. Built for the Build with AI Hackathon.
