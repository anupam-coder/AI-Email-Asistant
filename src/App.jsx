// src/App.jsx
import { useState } from "react";
import { generateEmail } from "./api";
import { useTheme } from "./ThemeContext";
import "./App.css";

function App() {
  const { darkMode, toggleTheme } = useTheme();
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [tone, setTone] = useState("Professional");
  const [showToast, setShowToast] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    const result = await generateEmail(prompt, tone);
    setOutput(result);
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setShowToast(true);
    celebrate(); // 🎉 Trigger confetti!
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleRegenerate = () => {
    handleGenerate();
  };

  const celebrate = () => {
    const container = document.getElementById("confetti-container");
    if (!container) return;

    const colors = [
      "#f94144",
      "#f3722c",
      "#f9c74f",
      "#90be6d",
      "#43aa8b",
      "#577590",
    ];

    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement("div");
      confetti.classList.add("confetti");
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDuration = Math.random() * 2 + 2 + "s";
      container.appendChild(confetti);

      // Remove after animation
      setTimeout(() => confetti.remove(), 4000);
    }
  };

  return (
    <div className={`container ${darkMode ? "dark" : ""}`}>
      <div className="top-bar">
        <h1>AI Email Writing Assistant</h1>
        <button className="dark-toggle" onClick={toggleTheme}>
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <div className="content-wrapper">
        <div className="input-panel">
          <textarea
            className="textarea"
            placeholder="Describe your email (e.g., request for leave, follow-up with client)"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={6}
          />
          <div className="char-count">Characters: {prompt.length}</div>

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

        <div className="output-panel">
          {loading ? (
            <div className="loading-screen">
              <div className="spinner"></div>
              <p className="loading-msg">
                Sit back and relax while your email is being prepared 😉
              </p>
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
                <div className="action-buttons">
                  <button className="copy-button" onClick={handleCopy}>
                    Copy to Clipboard
                  </button>
                  <button className="regen-button" onClick={handleRegenerate}>
                    Regenerate ✨
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <p className="disclaimer">
        ⚠️ Please avoid sharing sensitive business or personal information.
      </p>

      {showToast && <div className="toast">Copied!</div>}
      <div id="confetti-container"></div>
    </div>
  );
}

export default App;
