import axios from "axios"
import { useUser } from "../context/useUser"
const url = 'http://localhost:3001/'

export default function TodoList({todos, setTodos, setNotificationMessage}) {
    const {user} = useUser()
    function deleteTask(deletedItem){
        const headers = {headers: {Authorization: user.token}}
        console.log(deletedItem)
        setTodos(prevTodos => prevTodos.filter(item => item.id !== deletedItem.id).concat({ id: -2, description: "Deleting a task..."}))

        axios.delete(url + 'deletetask/' + deletedItem.id, headers)
        .then(data => {
            console.log(data.data)
            //add notification
            setTodos(prevTodos => prevTodos.filter(item => item.id !== -2))
        }).catch(e => {
            // alert(e.response.data.error ? e.response.data.error : e)
            setNotificationMessage("You session has been expired. Please log out and sign in again")
        })
    }
    function editTask(elementToEdit){
        return 0;
    }
    return (
        <ul>
            {todos.map(item => <li key={item.id}>{item.description} 
                <button onClick={() => deleteTask(item)}>Delete</button>
                <button onClick={() => editTask(item)}>Edit</button>
                </li>)}
        </ul>
    )
}