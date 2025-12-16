import koa from "koa";
import dotenv from "dotenv";
import router from "./routes/task.route";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = new koa();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  bodyParser({
    enableTypes: ["json"],
    jsonLimit: "10mb",
    strict: true,
  })
);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`Servidor corriendo en -> http://localhost:${PORT}`);
});
