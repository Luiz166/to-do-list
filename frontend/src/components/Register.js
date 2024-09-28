import '../output.css';
import '../LoginRegister.css';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";

function Register() {
    const navigate = useNavigate();

    const onClickHandleLoginLink = () => {
        navigate('/login')
    }

    const [username, setUserName] = useState('');
    const [useremail, setUserEmail] = useState('');
    const [userpassword, setUserPassword] = useState('');

    const handleNameChange = (e) =>{
        setUserName(e.target.value);
    }

    const handleEmailChange = (e) =>{
        setUserEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setUserPassword(e.target.value);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(
            !username ||
            !useremail ||
            !userpassword
        ){
            return toast.warn("Preencha todos os campos!");
        }else{
            await axios
                .post("http://localhost:8800/auth/register", {
                    name: username,
                    email: useremail,
                    password: userpassword
                })
                .then(res => {
                    console.log(res);
                    toast.success(res.data.message)
                    setTimeout(() => {
                        navigate('/login')
                    }, 3000)
                })
                .catch(err => {
                    console.log(err);
                    toast.error(err.response.data.message)});
        }
    }
    return(
        <div className='Register'>
            <div className='containerPage flex flex-col items-center justify-center'>
                <span className='text-2xl font-bold'>Dê o primeiro passo<br/>para organizar sua vida</span>
                <form onSubmit={handleSubmit} className='Form flex flex-col gap-4 mt-5 p-5 items-center rounded-xl'>
                    <div className='input-group floating-group'>
                        <input type='text' className='floating-input w-96 p-1 rounded-lg' value={username} onChange={handleNameChange} name="name" placeholder=' '/>
                        <label className='floating-label'>Seu nome</label>
                    </div>
                    <div className='input-group floating-group'>
                        <input type='email' className='floating-input w-96 p-1 rounded-lg' value={useremail} onChange={handleEmailChange} name='email' placeholder=' '/>
                        <label className='floating-label'>Seu email</label>
                    </div>
                    <div className='input-group floating-group'>
                        <input type='password' className='floating-input w-96 p-1 rounded-lg' value={userpassword} onChange={handlePasswordChange} name='password' placeholder=' '/>
                        <label className='floating-label'>Sua senha</label>
                    </div>
                    <button className='w-32 rounded-xl p-2 font-bold text-2xl' type='submit'>Cadastrar</button>
                    <div>
                        <span>Já tem uma conta?</span><span id='login-link' onClick={onClickHandleLoginLink}>Entrar</span>
                    </div>
                </form>
            </div>
           
        </div>
    )
}

export default Register;