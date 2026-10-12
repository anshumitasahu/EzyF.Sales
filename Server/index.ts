console.log("Hello via Bun!");

import express, { type Express, type Request, type Response } from 'express';
import cors from 'cors';
import AdminAuthRoutes from "./src/AdminLogin/AdminLoginRoute";

const PORT = 3000;

const app: Express = express();
app.use(cors());

app.use(express.json());

app.use("/admin/auth", AdminAuthRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});