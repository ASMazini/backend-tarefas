const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Tarefa = require('./models/Tarefa');

const app = express();

app.use(cors());
app.use(express.json());

// Sua URL exata da imagem, com o banco de dados "tarefas" adicionado antes do ?
const URL_BANCO = 'mongodb+srv://andersonsmazini_db_user:kjnPS3wVNynrzvKA@cluster0.3zoxbgb.mongodb.net/tarefas?appName=Cluster0';

// Conectando ao MongoDB Atlas
mongoose.connect(URL_BANCO)
  .then(() => console.log('MongoDB Atlas conectado com sucesso!'))
  .catch(err => console.log('Erro ao conectar no banco:', err));

// Rotas do Aplicativo (Criar, Ler, Atualizar, Deletar)
app.post('/tarefas', async(req, res) => { 
    const t = await Tarefa.create(req.body); 
    res.json(t);
});

app.get('/tarefas', async(req, res) => { 
    const t = await Tarefa.find(); 
    res.json(t);
});

app.put('/tarefas/:id', async(req, res) => { 
    const t = await Tarefa.findByIdAndUpdate(req.params.id, req.body, {new:true}); 
    res.json(t);
});

app.delete('/tarefas/:id', async(req, res) => { 
    await Tarefa.findByIdAndDelete(req.params.id); 
    res.json({ok:true});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));