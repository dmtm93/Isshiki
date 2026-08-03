import "./storage-shim.js";
import React from "react";
import { createRoot } from "react-dom/client";
import KanjiSRS from "./App.jsx";

const root = createRoot(document.getElementById("root"));
root.render(<KanjiSRS />);

// Register the service worker for offline support / installability.
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      // Non-fatal: app still works online without the service worker.
    });
  });

  // When a newly-deployed service worker takes over, a new version has
  // loaded in the background. Let the app know so it can prompt a refresh,
  // since silently swapping content under an open tab would be confusing.
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    window.dispatchEvent(new CustomEvent("isshiki:update-available"));
  });
}
