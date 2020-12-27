import express from "express";
import cors from "cors";
import {AddressInfo} from "net";
import { userRouter } from "./router/userRouter";
import dotenv from "dotenv";
import { musicRouter } from "./router/musicRouter";
import { playlistRouter } from "./router/playlistRouter";
import { albumRouter } from "./router/albumRouter";
import { artistRouter } from "./router/artistRouter";
import { genreRouter } from "./router/genreRouter";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/music",musicRouter);
app.use("/music",playlistRouter);
app.use("/music",albumRouter);
app.use("/music",artistRouter);
app.use("/music",genreRouter);


const server = app.listen(3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Servidor rodando em http://localhost:${address.port}`);
  } else {
    console.error(`Falha ao rodar o servidor.`);
  }
});