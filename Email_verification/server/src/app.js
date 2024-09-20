import express from "express";
import router from "./nodemailer.route.js";
const app = express();
app.use(express.json({ limit: "16kb" }));

app.use(router);

export default app;
