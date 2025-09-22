import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/hello", (req, res) => {
   res.send("Hello!");
});

const porta = process.env.PORT;
app.listen(porta, () => {
    console.log("O servidor está rodando na porta " + porta);
});


