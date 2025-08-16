require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./models/Index.js');

const PORT = process.env.PORT || 5000;

(async () => {
  await sequelize.sync(); // creates/updates tables
  app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
})();



// const app = require('./app');
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
