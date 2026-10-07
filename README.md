# Sentinel AI

**Detects reused, duplicated and manipulated copies of digital media by combining cryptographic fingerprints, perceptual hashing and AI reasoning into one verdict.**

[Live demo](https://google-solution-challange-iota.vercel.app) · Built by Team Hexacore for the Google Solution Challenge

Sports organisations, broadcasters and sponsors lose value when official graphics are reposted,
edited or used in scam promotions. Sentinel lets a rights holder register an original asset, then
check any suspicious file against it and get a risk level, a similarity score and a recommended
action.

> **Status: prototype.** The vault and scan history are stored in the browser's `localStorage`, so
> they are per device and not shared between users. There are no accounts yet.

## How it works

```text
Digital asset
   → SHA-256 fingerprint        exact duplicates
   → Perceptual hash            visually similar copies (crop, resize, filter, minor edits)
   → Similarity analysis        how close the suspect is to the original
   → AI reasoning               what kind of misuse it looks like
   → Verdict                    risk level, classification, recommended action
```

AI reasoning is built to keep working when a model is unavailable. Each request falls through this
chain until one layer answers:

```text
Gemini 2.5 Flash → Gemini 1.5 Flash-8B → Cohere Command R+ → local rule engine
```

## Features

| | |
| --- | --- |
| **Protect an asset** | Register official media in the vault. Each asset gets an ID, a SHA-256 fingerprint, a perceptual hash and a timestamp. |
| **Analyse a suspect** | Upload the original and the suspicious file to get visual similarity, likely transformations, risk level and reuse likelihood. |
| **Vault** | A registry of protected originals and their matchable signatures. |
| **Dashboard** | Total scans, risk-level breakdown, average similarity and recent detections. |
| **Fallback chain** | Analysis continues through model outages, ending in a local rule engine that needs no API. |

Example verdict:

```json
{
  "riskLevel": "High",
  "similarityScore": 88,
  "classification": "Unauthorized Copy",
  "recommendedAction": "Issue takedown request"
}
```

## Install and run

**Requirements:** Node.js 20 or later and npm.

```bash
git clone https://github.com/kirtanbhatt10/sentinel.git
cd sentinel
npm install
```

Create `.env.local` in the project root:

```bash
GEMINI_API_KEY=your_gemini_key
COHERE_API_KEY=your_cohere_key
```

Then start the app and open <http://localhost:3000>:

```bash
npm run dev
```

Without keys, the app still returns verdicts from the local rule engine.

## Using it

1. **Protect:** open **Analyze**, upload the official file and choose **Protect This Asset**. It appears in the **Vault**.
2. **Check:** upload the original and the suspicious file, then choose **Analyze Content** to see the threat report.
3. **Review:** open the **Dashboard** for totals and recent detections.

## Tech stack

| Layer | Used |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS 4, Framer Motion |
| AI | Google Gemini API, Cohere API as fallback |
| Detection | SHA-256 hashing, perceptual image hashing, local similarity engine |
| Storage | Browser `localStorage` (prototype) |
| Hosting | Vercel |

## Project structure

```text
src/
├── app/
│   ├── page.tsx                    Landing page
│   ├── analyze/page.tsx            Protect and analyse flow, hashing
│   ├── vault/page.tsx              Protected asset registry
│   ├── dashboard/page.tsx          Metrics
│   └── api/analyze-image/route.ts  AI reasoning and fallback chain
├── components/ui/                  Upload card, progress bar, status badge, logo
└── lib/                            Gemini and Firebase clients
```

## Limitations

- Images only; video is not fingerprinted.
- Data lives in one browser. Clearing site data clears the vault.
- No authentication, organisations or audit trail.
- Similarity is measured against assets you supply; there is no web-wide scanning.

## Roadmap

- [ ] Cloud database and multi-user organisation accounts
- [ ] Video fingerprinting
- [ ] Watermark detection
- [ ] Real-time web scanning
- [ ] Rights-management workflow with automated takedown notices
