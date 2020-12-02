import express from "express";
import cors from "cors";
import {AddressInfo} from "net";
import { userRouter } from "./router/userRouter";
import dotenv from "dotenv";
import { musicRouter } from "./router/musicRouter";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/music",musicRouter);


const server = app.listen(3000, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Servidor rodando em http://localhost:${address.port}`);
  } else {
    console.error(`Falha ao rodar o servidor.`);
  }
});