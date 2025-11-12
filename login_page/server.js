const express = require('express');
const app = express();
const path = require('path');
const usermodel = require('./user.model');

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const PORT = 3000;

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', async (req, res) => {
    const { username, email, password, countryCode, phone, qualification } = req.body;

    if (!username || !email || !password || !countryCode || !phone || !qualification) {
        return res.status(400).json({ message: 'Please fill out all required fields.' });
    }

    try {
        const existingUser = await usermodel.findOne({
            $or: [{ username: username }, { email: email }]
        });

        if (existingUser) {
            if (existingUser.username === username) {
                return res.status(400).json({ message: 'Username already taken.' });
            }
            if (existingUser.email === email) {
                return res.status(400).json({ message: 'Email already in use.' });
            }
        }
        else {
            const newUser = await usermodel.create({
                username,
                email,
                password,
                countryCode,
                phone,
                qualification
            });

            console.log('New user created:', newUser);
            res.status(200).json({ message: 'Registration successful! Redirecting...' });
        }

    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ message: 'An error occurred during registration.' });
    }
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email/username and password.' });
    }

    try {
        const user = await usermodel.findOne({
            $or: [
                { email: email },
                { username: email } // Check if the username field matches the email input
            ]
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: 'Incorrect password.' });
        }

        res.status(200).json({ message: 'Login successful! Redirecting...' });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: 'An error occurred during login.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});