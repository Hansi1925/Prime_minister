const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000' }));
app.use(express.json());

app.get('/api/health', (_, res) => res.json({ ok: true }));

app.use('/api/auth', require('./routes/authRoutes.js'));
app.use('/api/forms', require('./routes/formRoutes.js'));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Server error' });
});

module.exports = app;



// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// require('dotenv').config();
// const { connectMongo } = require('./config/db');

// connectMongo();

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/forms', require('./routes/formRoutes'));

// app.get('/', (req, res) => res.send('API Running'));

// module.exports = app;
