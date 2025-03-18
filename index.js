const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const chatRoutes = require('./routes/chatRoutes');
const doctorRoutes = require('./routes/doctorRoutes');

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/chat', chatRoutes);
app.use('/api/doctors', doctorRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));