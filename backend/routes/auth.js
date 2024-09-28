import database from "../database.js";
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
const router = express.Router();
import authenticateToken from './authMiddleware.js';

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    //verifica se o usuario ja existe
    const queryCheck = "SELECT * FROM users WHERE email = ?";
    database.query(queryCheck, [email], async (err, results) => {
        if(err) return res.status(500).json({message: 'Erro ao buscar usuário'})
        if(results.length > 0) {
            return res.status(400).json({message: 'Usuário já existe'});
        }

        //criptografa a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        //insere o novo usuário no banco de dados
        const queryInsert = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        database.query(queryInsert, [name, email, hashedPassword], (err, results) => {
            if(err){
                console.error('Erro ao cadastrar usuário', err)
                return res.status(500).json({message: 'Erro ao cadastras usuário'})
            }
            res.status(201).json({message: 'Usuário cadastrado com sucesso'});
        })
    })
})

router.get('/getUser', authenticateToken, (req,res) => {
    const user_id = req.user
    const query = 'SELECT * FROM users WHERE user_id = ?'
    database.query(query, [user_id], (err, results) => {
        if(err){
            console.log('Erro ao buscar usuário por id')
            return res.status(500).json({message: 'Erro ao buscar usuário por id'})
        }
        res.status(201).json(results);
    })
})

router.post('/login', (req, res) => {
    const {email, password} = req.body;

    //busca o usuario pelo email
    const query = 'SELECT * FROM users WHERE email = ?';
    database.query(query, [email], async(err, results)=>{
        if(err) return res.status(500).json({message: 'Erro ao buscar usuário'});
        if(results.length === 0) return res.status(400).json({message: 'Usuário não encontrado'});

        const user = results[0];
        console.log(results[0].user_id);

        // compara a senha enviada com a senha criptografada armazenada no banco de dados
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) return res.status(400).json({message:'Senha incorreta'});

        //gera o token JWT
        const token = jwt.sign({id: user.user_id}, JWT_SECRET, {expiresIn: '1h'});
        res.status(200).json({message: 'Login bem-sucedido', token});
    });
});

export default router;
