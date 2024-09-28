import axios from 'axios';
import '../output.css';
import { FaPen, FaRegTrashCan } from "react-icons/fa6";
import { toast } from 'react-toastify';

function GridList({ tasks, setOnEdit, getTasks }){

    const handleEdit = (item) => {
        setOnEdit(item);
    }

    const handleDeleteTask = async(id) => {
        await axios.delete(`http://localhost:8800/tasks/${id}`)
                .then(res => {
                    toast.success(res)
                    getTasks();
                })
                .catch(err => {
                    toast.error(err)
                })
        setOnEdit(null);
    }
    return(
        <div className='container mt-5'>
            <table className='table-auto w-full bg-indigo-900 rounded-lg'>
                <thead>
                    <tr>
                        <th className='text-left pl-5'>Tarefa</th>
                        <th className='text-left w-96'>Data</th>
                        <th className='w-20'></th>
                        <th className='w-20'></th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((item, i) => (
                    <tr key={i}>
                        <td className='pl-5'>{item.text}</td>
                        <td>{item.formattedDate}</td>
                        <td>
                            <button onClick={() => handleEdit(item)} className='p-2 hover:bg-slate-500 ease-in-out duration-300 rounded-lg'>
                                <FaPen/>
                            </button>
                        </td>
                        <td>
                            <button onClick={() => handleDeleteTask(item.task_id)} className='hover:bg-red-600 p-2 ease-in-out duration-300 rounded-lg'>
                                <FaRegTrashCan/>
                            </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default GridList;