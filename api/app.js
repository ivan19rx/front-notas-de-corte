const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())

app.use(cors())

const Usuario = require('./models/Usuario')
const Cursos = require('./models/Cursos')

const db = require('./models/db')

app.get('/', (req, res) => {
    res.send('funcionando')
})

//rotas do admin

app.get('/list-usuarios', async (req, res) => {
    await Usuario.findAll().then((data) => {
        return res.json({
            erro: false,
            data
        })
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "erro ao buscar dados",
        });
    });
})


app.post('/cad-usuario', async (req, res) => {

    const existingUsuario = await Usuario.findOne({ where: { email: req.body.email } });

    if (existingUsuario) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Já existe um usuario cadastrado com este nome!",
        });
    }



    await Usuario.create(req.body).then(() => {
        return res.status(200).json({
            erro: false,
            mensagem: "Usuario cadastrado com sucesso!",
        });
    })
        .catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Usuario não cadastrado com sucesso!",
            });
        });
})

app.put('/edit-usuario/:id', async (req, res) => {
    await Usuario.update(req.body, { where: { 'id': req.params.id } }).then(() => {
        return res.json({
            erro: false,
            mensagem: "Usuario editado com sucesso!",
        });
    })
        .catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Usuario não editado com sucesso!",
            });
        });
})

app.delete('/delete-usuario/:id', async (req, res) => {
    const numDestroyed = await Usuario.destroy({ where: { id: req.params.id } });
    if (numDestroyed === 0) {
        return res.json({
            erro: true,
            mensagem: "Nenhum usuario encontrado com o id fornecido!",
        });
    } else {
        return res.json({
            erro: false,
            mensagem: "Usuario deletado com sucesso!",
        });
    }
});

//rotas colaborador

app.get('/list-cursos', async (req, res) => {
    await Cursos.findAll().then((data) => {
        return res.json({
            erro: false,
            data
        })
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "erro ao buscar dados",
        });
    });
})

app.post('/cad-curso', async (req, res) => {
    const existingCurso = await Cursos.findOne({ where: { nome: req.body.nome } });

    if (existingCurso) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Já existe um usuario cadastrado com este nome!",
        });
    }

    await Cursos.create(req.body).then(() => {
        return res.status(200).json({
            erro: false,
            mensagem: "Curso cadastrado com sucesso!",
        });
    })
        .catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Curso não cadastrado com sucesso!",
            });
        });
})

app.put('/edit-curso/:id', async (req, res) => {
    await Cursos.update(req.body, { where: { 'id': req.params.id } }).then(() => {
        return res.json({
            erro: false,
            mensagem: "Curso editado com sucesso!",
        });
    })
        .catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Curso não editado com sucesso!",
            });
        });
})

app.delete('/delete-curso/:id', async (req, res) => {
    const numDestroyed = await Cursos.destroy({ where: { id: req.params.id } });
    if (numDestroyed === 0) {
        return res.json({
            erro: true,
            mensagem: "Nenhum curso encontrado com o id fornecido!",
        });
    } else {
        return res.json({
            erro: false,
            mensagem: "Curso deletado com sucesso!",
        });
    }
});


app.listen(8080, () => {
    console.log('servidor rodando')
})