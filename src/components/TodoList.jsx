import axios from "axios"
import { useUser } from "../context/useUser"
const url = 'http://localhost:3001/'

export default function TodoList({todos, setTodos, setNotificationMessage}) {
    const {user} = useUser()

    function deleteTask(deletedItem){
        const headers = {headers: {Authorization: user.token}}
        console.log(deletedItem)
        setTodos(prevTodos => prevTodos.filter(item => item.id !== deletedItem.id).concat({ id: -2, description: "Deleting a task..."}))
        console.log(deletedItem.user_email)
        axios.delete(url + 'deletetask/' + deletedItem.id, {
            data: {
                email: deletedItem.user_email 
            },
            headers: headers.headers
        })
        .then(data => {
            console.log(data.data)
            setTodos(prevTodos => prevTodos.filter(item => item.id !== -2))
        }).catch(e => {
            // alert(e.response.data.error ? e.response.data.error : e)
            setNotificationMessage("You session has been expired. Please log out and sign in again")
        })
    }
    async function handleCheckboxChange(elementToEdit){
        const headers = { headers: { Authorization: user.token } };
        const status = !elementToEdit.isdone;
        
        try {
            const result = await axios.put(url + 'setdone', { newStatus: status, id: elementToEdit.id }, headers);
            const updatedItem = result.data;
            console.log(status)
            setTodos(prevTodos =>
                prevTodos.map(item =>
                    item.id === updatedItem.id ? { ...item, isdone: updatedItem.isdone } : item
                )
            );
        } catch (error) {
            setNotificationMessage(error)
        }
    }
    return (
        <ul>
            {todos.map(item => 
            <li key={item.id}>
                <input 
                        type="checkbox" 
                        checked={item.isdone}
                        onChange={() => handleCheckboxChange(item)}
                />
                <span className={item.isdone ? 'strikethrough' : ''}>
                    {item.description}
                </span>
                <div className="button-container">
                    <button onClick={() => deleteTask(item)}>Delete</button>
                </div> 
            </li>)}
        </ul>
    )
}