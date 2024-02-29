import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import path from "path";
import cors from "cors";

interface FormInputs {
    email: string,
    password: string
}

// test user array
const users = [
    {
        id: 1,
        name: 'Jane Doe',
        email: 'jane@gmail.com',
        password: 'sillyg00se'
    },
    {
        id: 2,
        name: 'Juan Doe',
        email: 'juan@gmail.com',
        password: 'dondeesta!'
    }
];

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('/*', (req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
    });
}

app.post('/login', (req: Request, res: Response) => {
    const { email, password }:FormInputs = req.body;

    const user = users.find(user => {
        return user.email === email && user.password === password
    });

    if (!user) {
        return res.status(404).send('User not found!');
    }

    return res.status(200).json(user)
});


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});