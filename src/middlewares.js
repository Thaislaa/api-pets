import { pets } from "./dados.js";

export const verificaIdExisteste = (req, res, next) => {
    try {
        const { id } = req.params;
        const pet = pets.find((pet) => pet.id === id);
        if(!pet){
            return res.status(404).send({
                ok: false,
                mensagem: "Pet não encontrado."
            });
        }
        next();
    } catch (error) {
        res.status(500).send({
            ok: false,
            mensagem: error.toString()
        });
    }
}

export const verificaCamposValidos = (req, res, next) => {
    try {
        const {nome, raca, idade, tutor} = req.body;

        if(!nome){
            return res.status(400).send({
                ok: false,
                mensagem: "O campo 'nome' deve ser preenchido."
            });
        }

        if(!raca){
            return res.status(400).send({
                ok: false,
                mensagem: "O campo 'raca' deve ser preenchido."
            });
        }

        if(!idade){
            return res.status(400).send({
                ok: false,
                mensagem: "O campo 'idade' deve ser preenchido."
            });
        }

        if(!tutor){
            return res.status(400).send({
                ok: false,
                mensagem: "O campo 'tutor' deve ser preenchido."
            });
        }

        next();
    } catch (error) {
        res.status(500).send({
            ok: false,
            mensagem: error.toString()
        });
    }
}