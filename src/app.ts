import express, { Application, Request, Response } from "express";

import cors from "cors";
import { ProductRoutes } from "./app/modules/products/product.route";
import { OrdersRoutes } from "./app/modules/Orders/order.route";

const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

//Application
app.use("/api/products", ProductRoutes);
app.use("/api/orders", OrdersRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
