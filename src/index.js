import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { pets } from "./dados.js";
import { randomUUID } from "crypto";
import { verificaIdExisteste, verificaCamposValidos } from "./middlewares.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// GET /pets -> Lista pets
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

// GET /pets/:id -> Lista pets por id
app.get("/pets/:id", [verificaIdExisteste], (req, res) => {
    try {
        const { id } = req.params;

        const pet = pets.find((pet) => pet.id === id);

        res.status(200).send({
            ok: true,
            mensagem: "Pet encontrado com sucesso!",
            dados: pet
        });
    } catch (error) {
        res.status(500).send({
            ok: false,
            mensagem: error.toString()
        });
    }
})

// POST /pets -> Cria pet
app.post("/pets", [verificaCamposValidos], (req, res) => {
    try {
        const { nome, raca, idade, tutor } = req.body;

        const novoPet = ({
            id: randomUUID(),
            nome: nome,
            raca: raca,
            idade: idade,
            tutor: tutor,
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

// PUT /pets/:id -> Edita pet
app.put("/pets/:id", [verificaIdExisteste, verificaCamposValidos], (req, res) => {
    try {
        const { id } = req.params;
        const { nome, raca, idade, tutor } = req.body;

        const pet = pets.find((pet) => pet.id === id);
        pet.nome = nome;
        pet.raca = raca;
        pet.idade = idade;
        pet.tutor = tutor;

        res.status(200).send({
            ok: true,
            mensagem: "Pet atualizado com sucesso!",
            dados: pet
        });
    } catch (error) {
        res.status(500).send({
            ok: false,
            mensagem: error.toString()
        });
    }
});

// DELETE /pets/:id -> Exclui pet
app.delete("/pets/:id", [verificaIdExisteste], (req, res) => {
    try {
        const { id } = req.params;

        const Indexpet = pets.findIndex((pet) => pet.id === id);
        pets.splice(Indexpet, 1);

        res.status(200).send({
            ok: true,
            mensagem: "Pet excluído com sucesso.",
            dados: pets
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


