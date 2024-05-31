const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(express.json())

app.use(cors())

const bcrypt = require('bcrypt')

const Usuario = require('./models/Usuario')
const Cursos = require('./models/Cursos')

const db = require('./models/db')
const { where } = require('sequelize')
const jwt = require('jsonwebtoken')


app.get('/', (req, res) => {
    res.send('funcionando')
})

function checkToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.status(401).json({ msg: "acesso negado" })
    }

    try {

        const secret = process.env.SECRET

        jwt.verify(token, secret)

        next()


    } catch (error) {
        res.status(400).json({ msg: "token invalido" })
    }
}

//rota de autenticação

app.post('/login', async (req, res) => {
    const { email, senha } = req.body
    if (!email || !senha) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Todos os campos devem ser preenchidos!",
        });
    }

    const usuario = await Usuario.findOne({ where: { email: req.body.email } });
    if (!usuario) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Email ou senha incorretos"
        });
    }

    if (req.body.senha != usuario.senha) {
        return res.status(400).json({
            erro: true,
            msg: "Erro: Email ou senha incorretos"
        })
    }

    try {
        const secret = process.env.SECRET

        const token = jwt.sign({
            id: usuario.id,
            nome: usuario.nome,
            nivelAcesso: usuario.nivelacesso
        }, secret
        )

        user = {
            nome: usuario.nome,
            nivelacesso: usuario.nivelacesso
        }

        return res.status(200).json({ msg: "professor autenticado com sucesso", token, user })

    } catch (err) {
        console.log(err)

        return res.status(500).json({
            msg: "ocorreu um erro no servidor"
        })
    }
})

app.post("/register", async (req, res) => {
    const existingUsuario = await Usuario.findOne({ where: { email: req.body.email } });

    if (existingUsuario) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Já existe um usuario cadastrado com este email!",
        });
    }

    if (!req.body.nivelacesso) {
        req.body.nivelacesso = 'Cliente'; // Defina o valor padrão aqui
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

//rotas do admin

app.get('/list-usuarios', checkToken, async (req, res) => {
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

app.get('/get-usuario/:id', checkToken, async (req, res) => {

    await Usuario.findOne({ where: { id: req.params.id } }).then((data) => {
        return res.status(200).json(data)
    }).catch(() => {
        return res.status(400).json({ msg: "ocorreu algum erro" })
    }
    )
})


app.post('/cad-usuario', checkToken, async (req, res) => {

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

app.put('/edit-usuario/:id', checkToken,  async (req, res) => {
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

app.delete('/delete-usuario/:id', checkToken, async (req, res) => {
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

app.get('/list-cursos', checkToken, async (req, res) => {
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

app.get('/get-curso/:id',checkToken,  async (req, res) => {

    await Cursos.findOne({ where: { id: req.params.id } }).then((data) => {
        return res.status(200).json(data)
    }).catch(() => {
        return res.status(400).json({ msg: "ocorreu algum erro" })
    }
    )
})

app.post('/cad-curso', checkToken, async (req, res) => {
    const existingCurso = await Cursos.findOne({ where: { nome: req.body.nome } });

    if (existingCurso) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Já existe um curso cadastrado com este nome!",
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

app.put('/edit-curso/:id',checkToken,  async (req, res) => {
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

app.delete('/delete-curso/:id', checkToken, async (req, res) => {
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