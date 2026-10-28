console.log("Hello via Bun!");

import express, { type Express, type Request, type Response } from 'express';
import cors from 'cors';
// import AdminAuthRoutes from "./src/AdminLogin/AdminLoginRoute";
import categoryRouter from './src/Category/categoryRoutes';
import uploadRouter from './src/UploadImage/uploadRoutes';
import storeRouter from './src/Store/storeRoutes';
import productRouter from './src/Products/productRoutes';
import orderRouter from './src/Order/orderRoutes';
import analyticsRouter from './src/Analytics/AnalyticsRoutes';

const PORT = 4000;

const app: Express = express();
app.use(cors());

app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ limit: "15mb" }));

// app.use("/admin/auth", AdminAuthRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.use("/api/categories", categoryRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/store", storeRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/analytics", analyticsRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});