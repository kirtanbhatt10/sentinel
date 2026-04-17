"use client";

import { useState } from "react";

export default function Home() {
  const [original, setOriginal] = useState<File | null>(null);
  const [suspect, setSuspect] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async () => {
    if (!original || !suspect) {
      return alert("Upload both images");
    }

    const formData = new FormData();
    formData.append("originalImage", original);
    formData.append("suspectImage", suspect);
    formData.append("caption", caption);

    const res = await fetch("/api/analyze-image", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(JSON.stringify(data, null, 2));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Sentinel AI</h1>

      <h3>Upload Original Content</h3>
      <input type="file" onChange={(e) => setOriginal(e.target.files?.[0] || null)} />

      <br /><br />

      <h3>Upload Suspect Content</h3>
      <input type="file" onChange={(e) => setSuspect(e.target.files?.[0] || null)} />

      <br /><br />

      <input
        type="text"
        placeholder="Enter caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit}>Analyze</button>

      <pre>{result}</pre>
    </div>
  );
}