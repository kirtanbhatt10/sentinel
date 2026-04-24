# Sentinel AI

> AI-powered sports media protection platform for detecting unauthorized reuse, duplication, manipulation, and potential IP misuse of digital assets.

Sentinel AI is a prototype platform built to help sports organizations, teams, leagues, broadcasters, and media owners protect valuable visual content. It combines **AI reasoning**, **cryptographic fingerprinting**, **perceptual hashing**, and a **protected asset vault** to identify suspicious reuse of images and branded media.

---

# 🚀 Live Vision

Sports media loses value through:

- Unauthorized reposting
- Edited copies of official graphics
- Scam promotions using branded assets
- Impersonation pages
- Reused match posters
- Manipulated sponsor creatives
- Unlicensed highlight content

Sentinel AI aims to provide a smart protection layer that helps rights holders detect and respond quickly.

---

# ✨ Key Features

## 🔐 1. Protect Original Assets

Upload official media and register it into the Sentinel Vault.

Each protected asset receives:

- Unique Asset ID
- SHA-256 cryptographic fingerprint
- Perceptual visual hash
- Protection timestamp

---

## 🧠 2. AI Misuse Detection

Upload suspicious content and Sentinel analyzes:

- Visual similarity
- Structural reuse
- Possible transformations
- Risk level
- Reuse likelihood
- Recommended action

---

## 🧬 3. Multi-Layer Detection Engine

Sentinel combines:

### Cryptographic Fingerprinting

Detects exact file duplicates.

### Perceptual Hashing

Detects visually similar copies even after:

- Cropping
- Resizing
- Filters
- Minor edits

### AI Reasoning

Uses Gemini + fallback systems for contextual misuse classification.

---

## 🏛️ 4. Sentinel Vault

A protected registry of uploaded original assets.

Tracks:

- Protected media
- IDs
- Timestamps
- Matchable signatures

---

## 📊 5. Dashboard Analytics

Visual overview of:

- Total scans
- Risk levels
- Average similarity
- Recent detections

---

## 🛡️ 6. Reliability Layer

Sentinel is designed with multi-layer fallback logic:

```text
Gemini Primary
↓
Gemini Secondary
↓
Cohere Fallback
↓
Local Sentinel Rule Engine

This ensures analysis continues even during model outages.

🧱 Tech Stack
Frontend
Next.js 16
React
TypeScript
Tailwind CSS
Framer Motion
AI Models
Google Gemini API
Cohere API (fallback)
Detection Engine
SHA-256 hashing
Perceptual image hashing
Local similarity engine
Storage (Prototype)
Browser LocalStorage
📂 Project Structure
src/
 ├ app/
 │   ├ page.tsx            # Landing page
 │   ├ analyze/page.tsx    # Main analysis system
 │   ├ vault/page.tsx      # Protected asset registry
 │   ├ dashboard/page.tsx  # Metrics dashboard
 │   └ api/analyze-image/route.ts
 │
 ├ components/ui/
 │   ├ UploadCard.tsx
 │   ├ ProgressBar.tsx
 │   ├ StatusBadge.tsx
 │   └ Logo.tsx
⚙️ Installation
Clone Repository
git clone https://github.com/yourusername/sentinel-ai.git
cd sentinel-ai
Install Dependencies
npm install
Add Environment Variables

Create:

.env.local

Add:

GEMINI_API_KEY=your_gemini_key
COHERE_API_KEY=your_cohere_key
▶️ Run Locally
npm run dev

Open:

http://localhost:3000
🧪 How to Use
Protect an Asset
Open Analyze page
Upload official content
Click Protect This Asset
Asset stored in Vault
Analyze Suspicious Content
Upload original media
Upload suspicious media
Click Analyze Content
View threat report
📌 Example Output
{
  "riskLevel": "High",
  "similarityScore": 88,
  "classification": "Unauthorized Copy",
  "recommendedAction": "Issue takedown request"
}
🎯 Real World Use Cases
Sports Leagues

Protect match graphics, posters, highlights.

Clubs & Teams

Detect fake promotions or reused branding.

Broadcasters

Track unauthorized reposting of official media.

Sponsors

Protect campaign creatives from misuse.

🔮 Future Roadmap
Video fingerprinting
Watermark intelligence
Real-time web scanning
Firebase / Cloud database
Multi-user organization accounts
Rights management workflows
Automated takedown notices
API integrations for broadcasters
🏆 Why Sentinel Matters

Digital sports content is valuable intellectual property.

Sentinel helps organizations move from:

Manual monitoring
↓
Reactive enforcement

to:

Automated detection
↓
Faster response
↓
Stronger protection

👨‍💻 Author
Team:- Hexacore
Built as an innovation prototype for modern sports media protection for the Google solution challange.


⭐ If You Like This Project

Star the repository and support future development.