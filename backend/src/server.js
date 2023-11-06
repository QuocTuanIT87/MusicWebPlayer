require('dotenv').config();
const cors = require('cors');
const express = require('express');
const configViewEngine = require('./config/viewEngine');

//router config
const userRoutes = require('./routes/user');
const songRoutes = require('./routes/song');

const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;
const testConnection = require('./config/database');

// Sử dụng CORS middleware
app.use(cors());

//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// for parsing multipart/form-data
// app.use(upload.array());

//config template engine
configViewEngine(app);

app.use('/api', userRoutes);
app.use('/api', songRoutes);

testConnection();

app.listen(port, hostname, () => {
    console.log(`Server is running on port ${port}`);
});
