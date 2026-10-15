console.log("Hello via Bun!");

import express, { type Express, type Request, type Response } from 'express';
import cors from 'cors';
// import AdminAuthRoutes from "./src/AdminLogin/AdminLoginRoute";
import categoryRouter from './src/Category/categoryRoutes';
import uploadRouter from './src/UploadImage/uploadRoutes';

const PORT = 3000;

const app: Express = express();
app.use(cors());

app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ limit: "15mb" }));

// app.use("/admin/auth", AdminAuthRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.use("/api/categories", categoryRouter);
app.use("/api/uppload", uploadRouter)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});