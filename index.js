const express = require('express');
const dotenv = require('dotenv');
const profileRoutes = require('./routes/profileRoutes');

dotenv.config();

const app = express();
app.use(express.json());

// Link all modular paths together under a base routing structure
app.use('/api', profileRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Backend service is up and running modularly on port ${PORT}`);
});