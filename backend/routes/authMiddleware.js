import jwt from 'jsonwebtoken';
import 'dotenv/config';
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if(!token) return res.status(401).json({message: 'Acesso negado, token invalido'});

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if(err) return res.status(403).json({message: 'Token inválido'});
        console.log(user.id);
        req.user = user.id; //armazena o usuario decodificado no request
        next();//prossegue pra proxima funcao
    })
}

export default authenticateToken;