import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Init web vitals after render to avoid React context issues
import("./lib/webVitals").then(({ initWebVitals }) => initWebVitals());
