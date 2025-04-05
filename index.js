const express = require('express');
const connectDB = require('./config/database');
const dotenv = require('dotenv');
const commentRoutes = require('./routes/commentRoutes');
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use('/api/comments', commentRoutes);
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
