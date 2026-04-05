const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Tarefa = require('./models/Tarefa');

const app = express();

app.use(cors());
app.use(express.json());

const URL_BANCO = 'mongodb+srv://andersonsmazini_db_user:kjnPS3wVNynrzvKA@cluster0.3zoxbgb.mongodb.net/tarefas?appName=Cluster0';

mongoose.connect(URL_BANCO)
  .then(() => console.log('MongoDB Atlas conectado com sucesso!'))
  .catch(err => console.log('Erro ao conectar no banco:', err));

// --- ROTAS ---

app.post('/tarefas', async(req, res) => { 
    const t = await Tarefa.create(req.body); 
    res.json(t);
});

// EXERCÍCIO 4: LISTAR ORDENADO (do mais novo para o mais antigo)
app.get('/tarefas', async(req, res) => { 
    // .sort({ _id: -1 }) é um truque do Mongo: como o ID contém a data,
    // colocar -1 faz os últimos criados aparecerem primeiro.
    const t = await Tarefa.find().sort({ _id: -1 }); 
    res.json(t);
});

// EXERCÍCIO 3: BUSCAR POR ID (Para a tela de detalhes parar de carregar)
app.get('/tarefas/:id', async(req, res) => { 
    try {
        const t = await Tarefa.findById(req.params.id); 
        if (!t) return res.status(404).json({ erro: "Não encontrado" });
        res.json(t);
    } catch (err) {
        res.status(400).json({ erro: "ID Inválido" });
    }
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