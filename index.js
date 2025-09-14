require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');

const { connectDB } = require('./utils/db');
const authRoutes = require('./routes/authRoutes');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

// ---- middleware ----
app.use(cors());
app.use(express.json());

// ---- routes ----
app.use('/api/auth', authRoutes);


app.use((req, res) => res.status(404).json({ error: 'Not found' }));

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || (err.code === 'AUTH_INVALID_CREDENTIALS' ? 401 : 500);
  res.status(status).json({ error: err.message || 'Internal Server Error' });
});

async function start() {
  await connectDB();
  server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}

start();