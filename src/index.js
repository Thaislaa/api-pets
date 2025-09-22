import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { pets } from "./dados.js";
import { randomUUID } from "crypto";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// GET /pets - Lista pets
app.get("/pets", (req, res) => {
    try {
        res.status(200).send({
            ok: true,
            mensagem: "Pets listados com sucesso!",
            dados: pets
        });
    } catch (error) {
        res.status(500).send({
            ok: false,
            mensagem: error.toString()
        });
    }
});

// POST /pets - Cria pet
app.post("/pets", (req, res) => {
    try {
        const body = req.body;
        const novoPet = ({
            id: randomUUID(),
            nome: body.nome,
            raca: body.raca,
            idade: body.idade,
            tutor: body.tutor,
        });
        pets.push(novoPet);
        res.status(201).send({
            ok: true,
            mensagem: "Pet criado com sucesso!",
            dados: novoPet
        });
    } catch (error) {
        res.status(500).send({
            ok: false,
            mensagem: error.toString()
        });
    }
});

const porta = process.env.PORT;
app.listen(porta, () => {
    console.log("O servidor está rodando na porta " + porta);
});


