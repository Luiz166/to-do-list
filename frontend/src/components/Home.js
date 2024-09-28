import '../output.css';
import '../Home.css';
import { FaCirclePlus } from "react-icons/fa6";
import { IconContext } from 'react-icons/lib';
import GridList from './GridList.js';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify'

function Home() {
    const [tasks, setTasks] = useState([]);
    const token = localStorage.getItem('token');
    const getTasks = async () => {
        try{
            const res = await axios.get('http://localhost:8800/tasks/',
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
        );
            const formattedTasks = res.data.map(task => ({
                ...task,
                formattedDate: new Date(task.date).toLocaleDateString('pt-BR'),
                formattedDateDefault: new Date(task.date).toLocaleDateString('en-ZA')
            }))
            setTasks(formattedTasks);
        }catch(err){
            toast.error(err);
        }

    }
    const [user, setUser] = useState({});
    const getUser = async () => {
        try{
            const res = await axios.get('http://localhost:8800/auth/getUser', {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            setUser(res.data[0])
        }catch(err){
            toast.error(err);
        }
        
    }

    useEffect(() => {
        getUser()
    }, []);

    useEffect(() => {
        getTasks()
    }, [setTasks]);


    const [text, setText] = useState();
    const [date, setDate] = useState();

    const handleTextChange = (e) => {
        setText(e.target.value);
    }

    const handleDateChange = (e) => {
        setDate(e.target.value);
    }
    const handleFormTask = async (e) => {
        e.preventDefault();
        if(onEdit){
            
            await axios
                .put(`http://localhost:8800/tasks/${onEdit.task_id}`, {
                    text: text,
                    date: date
                })
                .then(res => {
                    console.log(res)
                    toast.success(res)
                    getTasks();
                })
                .catch(err => {
                    console.log(err)
                    toast.error(err.response.data.message)
                })
                setOnEdit(null);
        }else{
            axios
                .post('http://localhost:8800/tasks/', 
                    {
                        text: text,
                        date: date
                    },
                    {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(res => {
                    console.log(res);
                    toast.success(res.data.message)
                    getTasks();
                })
                .catch(err => {
                    toast.error(err.response.data.message)
                })
        }
    }

    const [onEdit, setOnEdit] = useState(null);

    const formatDateToyyyyMMdd = (dateString) => {
        const dateObj = new Date(dateString)
        const year = dateObj.getFullYear()
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    useEffect(() => {
        if(onEdit) {
            console.log(onEdit);
            setText(onEdit.text);
            setDate(formatDateToyyyyMMdd(onEdit.formattedDateDefault));
        }
    }, [onEdit])

    return (
        <div className='Home'>
            <div className='containerPage flex flex-col items-center'>
                <span className='font-bold text-3xl'>Olá, {user.name}</span>
                <form className='add-task-form flex flex-row gap-4 justify-center w-fit p-3 rounded-xl items-center mt-5' onSubmit={handleFormTask}>
                    <div className='floating-group flex gap-4'>
                        <input name='text' className='floating-input w-96 p-1 rounded-lg' type='text' value={text} onChange={handleTextChange} maxLength={50} placeholder=' '/>
                        <label className='floating-label'>Digite uma tarefa...</label>
                        <input name='date' type='date' className='rounded-lg' value={date} onChange={handleDateChange}/>
                    </div>
                    <IconContext.Provider value={{color: "#00cfc1"}}>
                        <button type='submit' className='rounded-full font-bold text-3xl text-center flex justify-center items-center'><FaCirclePlus/></button>
                    </IconContext.Provider>
                </form>
                <GridList tasks={tasks} setOnEdit={setOnEdit} getTasks={getTasks}/>
            </div>
        </div>
    )
}

export default Home;