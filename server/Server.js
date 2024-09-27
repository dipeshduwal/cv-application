require('dotenv').config({ path: '../.env' });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/Database');
const authRoutes = require('./routes/AuthRoute');
const userRoutes = require('./routes/UserRoute');
const educationRoutes = require('./routes/EducationRoute');
const experienceRoutes = require('./routes/ExperienceRoute');
const skillRoutes = require('./routes/SkillRoute');
const infoRoutes = require('./routes/PersonalInfoRoute')

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/educations', educationRoutes);
app.use('/experiences', experienceRoutes);
app.use('/skills', skillRoutes);
app.use('./infos', infoRoutes);

const PORT = process.env.PORT || 5000;

// Sync with database and start the server
sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
}).catch(err => console.error('Unable to connect to the database:', err));
