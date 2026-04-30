import React from "react";
import ReactDOM from "react-dom/client";
import "../../../packages/ui/src/styles.css";

function WebApp() {
  return (
    <div className="web-companion">
      <div className="placeholder-card">
        <span className="section-label">Web Companion</span>
        <h1>Vivido companion surface scaffold</h1>
        <p>The full editor stays desktop-first. This web app exists as a future sync/review surface.</p>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WebApp />
  </React.StrictMode>
);
