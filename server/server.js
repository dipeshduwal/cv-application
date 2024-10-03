require('dotenv').config({ path: '../.env' });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const fileUpload = require('express-fileupload');
const authRoutes = require('./routes/authRoute');
const userRoutes = require('./routes/userRoute');
const educationRoutes = require('./routes/educationRoute');
const experienceRoutes = require('./routes/experienceRoute');
const skillRoutes = require('./routes/skillRoute');
const infoRoutes = require('./routes/personalInfoRoute');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(fileUpload());

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/educations', educationRoutes);
app.use('/experiences', experienceRoutes);
app.use('/skills', skillRoutes);
app.use('/infos', infoRoutes);

const PORT = process.env.PORT || 5000;

// Sync with database and start the server
sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
}).catch(err => console.error('Unable to connect to the database:', err));
