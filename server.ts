import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

interface VisitsData {
  total: number;
  today: number;
  lastDate: string;
  lastVisitedAt: string;
  history: Record<string, number>;
  recentVisits?: Array<{ timestamp: string; path?: string }>;
}

const DATA_FILE = path.join(process.cwd(), 'data', 'visits.json');

function getTodayString(): string {
  return new Date().toISOString().slice(0, 10);
}

function loadVisitsData(): VisitsData {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      const data = JSON.parse(raw) as VisitsData;
      if (typeof data.total === 'number') {
        const todayStr = getTodayString();
        if (data.lastDate !== todayStr) {
          data.today = 0;
          data.lastDate = todayStr;
        }
        if (!data.history) data.history = {};
        return data;
      }
    }
  } catch (err) {
    console.warn(`[${new Date().toISOString()}] [WARN] Error reading visits data, initializing fresh data:`, err);
  }

  const todayStr = getTodayString();
  const initial: VisitsData = {
    total: 1249,
    today: 1,
    lastDate: todayStr,
    lastVisitedAt: new Date().toISOString(),
    history: { [todayStr]: 1 },
    recentVisits: [],
  };

  saveVisitsData(initial);
  return initial;
}

function saveVisitsData(data: VisitsData): void {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`[${new Date().toISOString()}] [ERROR] Error writing visits data:`, err);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Structured request logging middleware for /api routes
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
      const start = Date.now();
      res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`[${new Date().toISOString()}] [API] ${req.method} ${req.path} -> ${res.statusCode} (${duration}ms)`);
      });
    }
    next();
  });

  // API Route: Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // API Route: Get current visits count (supports both /api/visits and /api/visits/stats)
  app.get(['/api/visits', '/api/visits/stats'], (_req, res) => {
    const data = loadVisitsData();
    res.json({
      total: data.total,
      today: data.today,
      lastVisitedAt: data.lastVisitedAt,
      history: data.history,
    });
  });

  // API Route: Register a real visit
  app.post('/api/visits/hit', (req, res) => {
    const data = loadVisitsData();
    const todayStr = getTodayString();

    if (data.lastDate !== todayStr) {
      data.today = 0;
      data.lastDate = todayStr;
    }

    data.total += 1;
    data.today += 1;
    data.lastVisitedAt = new Date().toISOString();

    if (!data.history) data.history = {};
    data.history[todayStr] = (data.history[todayStr] || 0) + 1;

    // Keep last 50 visits log
    if (!data.recentVisits) data.recentVisits = [];
    data.recentVisits.unshift({
      timestamp: data.lastVisitedAt,
      path: req.body?.path || '/',
    });
    if (data.recentVisits.length > 50) {
      data.recentVisits = data.recentVisits.slice(0, 50);
    }

    saveVisitsData(data);

    res.json({
      success: true,
      total: data.total,
      today: data.today,
      lastVisitedAt: data.lastVisitedAt,
    });
  });

  // API Route: Update or adjust visits count (admin utility)
  app.post('/api/visits/set', (req, res) => {
    const { newTotal } = req.body;
    if (typeof newTotal === 'number' && newTotal >= 0) {
      const data = loadVisitsData();
      data.total = Math.floor(newTotal);
      data.lastVisitedAt = new Date().toISOString();
      saveVisitsData(data);
      return res.json({ success: true, total: data.total });
    }
    return res.status(400).json({ error: 'Invalid total number' });
  });

  // Dedicated 404 handler for API routes (prevents returning HTML SPA fallback on unknown API routes)
  app.all('/api/*', (req, res) => {
    res.status(404).json({ error: `Rota API não encontrada: ${req.method} ${req.path}` });
  });

  // Global error-handling middleware for Express
  app.use((err: any, req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(`[${new Date().toISOString()}] [ERROR] ${req.method} ${req.path}:`, err?.message || err);
    if (res.headersSent) return;
    res.status(err.status || 500).json({
      error: err?.message || 'Erro interno no servidor',
    });
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
