import express from 'express';
import cors from 'cors';
import { PrismaClient } from "./generated/prisma/index.js";

const prisma = new PrismaClient();

const app = express();
const port = process.env.port || 3000;

app.use(express.json());
app.use(cors());

// Iniciar Servidor
app.listen(port, () => {
  console.log("Server is running on port 3000");
})

// Rota inicial
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Incluir usuario
app.post('/usuarios', async (req, res) => {
  await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    }
  })
  res.status(201).json({message: "Usuario criado com sucesso"});
});

// Listar usuarios
app.get('/usuarios', async (req, res) => {
  const users = await prisma.user.findMany()
  res.status(200).json(users);  
});

// Listar usuario por id
app.get('/usuarios/:id', async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.params.id,
    },
  })
  res.status(200).json(user);
});

// Atualizar usuario
app.put('/usuarios/:id', async (req, res) => {
  await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    }
  })
  res.status(201).json({message: "Usuario atualizado com sucesso"});
});

// Deletar usuario
app.delete('/usuarios/:id', async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  })
  res.status(201).json({message: "Usuario deletado com sucesso"});
});
