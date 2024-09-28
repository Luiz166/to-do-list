import express from "express";
import cors from "cors";
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/task.js';
const app = express ();

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes );
app.use('/tasks', taskRoutes);

app.listen(8800, ()=>{
    console.log('Servidor rodando na porta 8800');
});
