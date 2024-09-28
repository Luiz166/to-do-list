import express from 'express';
import database from '../database.js';
import authenticateToken from './authMiddleware.js';
const router = express.Router();
//rota para mostrar todas as tarefas
router.get('/', authenticateToken, (req, res) => {
    const query = 'SELECT * FROM tasks WHERE user_id = ?'; //filtra por usuario
    database.query(query, [req.user], (err, results) => {
        if(err){
            console.error('Erro ao buscar tarefas:', err);
            return res.status(500).json({message: 'Erro ao buscar tarefas'});
        }
        res.status(200).json(results);
    });
});
//rota para criar novas tarefas
router.post('/', authenticateToken, (req, res) =>{
    const {text, date} = req.body;
    const user_id = req.user;
    const query = 'INSERT INTO tasks (text, date, user_id) VALUES (?, ?, ?)'
    database.query(query, [text, date, user_id], (err, results) => {
        if(err){
            console.error('Erro ao inserir tarefa:', err);
            return res.status(500).json({message: 'Erro ao inserir tarefa'});
        }
        return res.status(200).json({message: 'Tarefa adicionada com sucesso'});
    })
})
//rota para atualizar tarefa
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { text, date } = req.body;
    const query = 'UPDATE tasks SET text = ?, date = ? WHERE task_id = ?';
    database.query(query, [text, date, id], (err, results) => {
        if(err){
            console.error('Erro ao atualizar tarefa:', err);
            return res.status(500).json({message: 'Erro ao atualizar tarefa'});
        }
        res.status(200).json(results);
    })
})
//rota para deletar tarefa
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM tasks WHERE task_id = ?'
    database.query(query, [id], (err, results)=>{
        if(err){
            console.error('Erro ao deletar tarefa:', err);
            return res.status(500).json({message: 'Erro ao deletar tarefa'});
        }
        res.status(200).json(results);
    })
});

export default router;