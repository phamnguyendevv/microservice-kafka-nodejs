import express from "express";
import catalogRouter from "./api/catalog.routes";
import { httpLogger, HandleErrorWithLogger } from "./utils";

const app = express();
app.use(express.json());
app.use(httpLogger);

app.use("/", catalogRouter);
// Thêm middleware xử lý lỗi ở cuối
app.use(HandleErrorWithLogger);

export default app;
