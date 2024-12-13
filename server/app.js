import Express from "express";

import cors from "cors";
import transectionRouter from "./routes/transectionRouter.js";
// import { errorHandlerMiddleware } from "./controllers/errors/errors";

const app = Express();

const corsOptions = {
  origin: true, // Allow requests from this origin
  credentials: true, // Allow cookies to be sent
};

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use(cors(corsOptions));
app.use(Express.json());

app.use((req, res, next) => {
  //   console.log(`cookies: ${req.cookies}`);
  next();
});

app.use("/api/transections", transectionRouter);

// app.use(errorHandlerMiddleware);

export default app;
