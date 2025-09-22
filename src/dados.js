import {randomUUID } from "crypto";

export const pets = [
  {
    id: randomUUID(),
    nome: "Rex",
    raca: "Labrador",
    idade: 5,
    tutor: "João Silva",
  },
  {
    id: randomUUID(),
    nome: "Mia",
    raca: "Persa",
    idade: 3,
    tutor: "Maria Souza",
  },
  {
    id: randomUUID(),
    nome: "Thor",
    raca: "Bulldog Francês",
    idade: 2,
    tutor: "Carlos Oliveira",
  },
];
