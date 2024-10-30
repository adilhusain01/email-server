const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const templateRoutes = require('./routes/templateRoutes');
const listRoutes = require('./routes/listRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const trackingRoutes = require('./routes/trackingRoutes');
const cors = require('cors');
const { logger } = require('./middleware/logEvents');

const app = express();
app.use(cors());
app.use(logger);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', templateRoutes);
app.use('/api', listRoutes);
app.use('/api', campaignRoutes);
app.use('/api', trackingRoutes);

const PORT = process.env.PORT || 3000;

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
