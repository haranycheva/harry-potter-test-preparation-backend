import express from "express";
import cors from "cors";
import authRouter from "./routes/auth-router.js";
import swaggerDocument from "./swagger.json" assert { type: "json" };
import swaggerui from "swagger-ui-express";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/auth", authRouter);

app.use("/docs", swaggerui.serve, swaggerui.setup(swaggerDocument));

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status ? err.status : 500).json({ message: err.message });
});

export default app;
