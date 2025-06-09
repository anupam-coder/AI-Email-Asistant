import { useState } from "react";
import { generateEmail } from "./api";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [tone, setTone] = useState("Professional");

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    const result = await generateEmail(prompt, tone);
    setOutput(result);
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>AI Email Writing Assistant</h1>
      <div className="content-wrapper">
        {/* Left Side: Input */}
        <div className="input-panel">
          <textarea
            className="textarea"
            placeholder="Describe your email (e.g., request for leave, follow-up with client)"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={6}
          />
          <div className="tone-label">Select Tone</div>
          <select
            className="dropdown"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          >
            <option>Professional</option>
            <option>Friendly</option>
            <option>Apologetic</option>
            <option>Persuasive</option>
          </select>
          <button
            className="button"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Email"}
          </button>
        </div>

        {/* Right Side: Output */}
        <div className="output-panel">
          {loading ? (
            <div className="loading-screen">
              <div className="spinner"></div>
              <p>Sit back and relax while your email is being prepared 😉</p>
            </div>
          ) : (
            <>
              <h2>Suggested Email:</h2>
              <textarea
                className="textarea"
                value={output}
                rows={12}
                readOnly
              />
              {output && (
                <button
                  className="copy-button"
                  onClick={() => navigator.clipboard.writeText(output)}
                >
                  Copy to Clipboard
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
