import fetch from "node-fetch"
import express from "express" 
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import path from 'path';
import { fileURLToPath } from "url";

dotenv.config();

const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set('view engine', 'ejs');
app.use(express.static('Public'));
app.set('views', path.join(__dirname,'Public' ,'views'));
app.use(bodyParser.json());

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const redirectUri = 'http://localhost:3000/auth/google/callback';

app.get('/', (req, res) => {
    res.render('index', { googleClientId });
});

app.post('/auth/google', async (req, res) => {
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ success: false, message: 'Google ID token is required' });
    }

    try {
        const userInfo = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${code}`);
        const user = await userInfo.json();

        if (user.error) {
            return res.status(400).json({ success: false, message: 'Invalid token' });
        }
        res.json({ success: true, user });
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
