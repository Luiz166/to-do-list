import '../LoginRegister.css';
import '../output.css';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

function Login() {
    const navigate = useNavigate();

    const handleClickRegister = () => {
        navigate('/register');
    }

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(
            !email ||
            !password
        ){
            toast.warn('Preencha todos os campos!')
        }else{
            axios
                .post('http://localhost:8800/auth/login', {
                    email: email,
                    password: password
                })
                .then(res => {
                    toast.success(res.data.message)
                    setTimeout(() => {
                        navigate('/home')
                    }, 4000)
                    localStorage.setItem('token', res.data.token);
                })
                .catch(err => {
                    toast.error(err.response.data.message)
                })
        }
    }

    return (
        <div className='Login'>
            <div className='containerPage flex justify-center items-center flex-col w-full'>
                <span className='text-3xl font-bold'>Bem-vindo de volta!</span>
                <form className='Form flex flex-col gap-4 mt-5 p-5 items-center rounded-xl' onSubmit={handleSubmit}>
                    <div className='input-group floating-group'>
                        <input className='floating-input w-96 p-1 rounded-lg' placeholder=' ' type='email' value={email} onChange={handleEmailChange}/>
                        <label className='floating-label'>Seu e-mail</label>
                    </div>
                    <div className='input-group floating-group'>
                        <input className='floating-input w-96 p-1 rounded-lg' placeholder=' ' type='password' value={password} onChange={handlePasswordChange}/>
                        <label className='floating-label'>Sua senha</label>
                    </div>
                    <button className='w-32 rounded-xl p-2 font-bold text-2xl' type='submit'>Entrar</button>
                    <div>
                    <span>Não tem uma conta?</span> <span onClick={handleClickRegister} id='register-link'>Cadastre-se</span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;