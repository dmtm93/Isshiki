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
}
