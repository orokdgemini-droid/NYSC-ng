// Minimal Express server to serve the static site and a demo login API.
// NOTE: For production, secure session store, HTTPS, and proper auth are required.
const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Demo user (same as front-end)
const DEMO_USERS = {
  corper: { username: 'corper', password: 'nysc123', fullName: 'Corper John Doe', status: 'Active', callUp: null }
};

// Middlewares
app.use(bodyParser.json());
app.use(session({
  name: 'nysc_session',
  secret: process.env.SESSION_SECRET || 'change-me',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production', httpOnly: true, maxAge: 24*60*60*1000 }
}));

// Serve static front-end files from ./public
app.use(express.static(path.join(__dirname, 'public')));

// API: POST /api/login { username, password }
app.post('/api/login', (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ ok:false, msg: 'Missing credentials' });
  const user = DEMO_USERS[username];
  if (!user || user.password !== password) return res.status(401).json({ ok:false, msg: 'Invalid username or password' });

  // Save safe session data (don't store password)
  req.session.user = {
    username: user.username,
    fullName: user.fullName,
    status: user.status,
    callUp: user.callUp
  };
  res.json({ ok:true, user: req.session.user });
});

// API: GET /api/session -> current session info
app.get('/api/session', (req, res) => {
  if (!req.session.user) return res.json({ authenticated: false });
  res.json({ authenticated: true, user: req.session.user });
});

// API: POST /api/logout
app.post('/api/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ ok:true });
  });
});

// Fallback: serve index.html for client-side routing (optional)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));