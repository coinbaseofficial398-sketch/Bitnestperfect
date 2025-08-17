import express, { type Request, Response, NextFunction } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { registerRoutes } from "./routes"; 
import { setupVite, serveStatic, log } from "./vite-setup"; // adjust if you don’t have these

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Example middleware to log request + response times
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const path = req.path;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    (res as any)._capturedJsonResponse = bodyJson;
    return (originalResJson as any).apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      console.log(`[API] ${req.method} ${path} - ${duration}ms`);
    }
  });

  next();
});

// Register API routes
registerRoutes(app);

// ---- Serve Frontend (after Vite build) ----
const distPath = path.join(__dirname, "../dist");
app.use(express.static(distPath));

// Send index.html for any non-API route
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// ---- Start server ----
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
