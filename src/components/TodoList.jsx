import axios from "axios"
const url = 'http://localhost:3001/'

export default function TodoList({todos, setTodos}) {
    function deleteTask(deletedItem){
        console.log(deletedItem)
        setTodos(prevTodos => prevTodos.filter(item => item.id !== deletedItem.id).concat({ id: -2, description: "Deleting a task..."}))

        axios.delete(url + 'deletetask/' + deletedItem.id)
        .then(data => {
            console.log(data.data)
            //add notification
            setTodos(prevTodos => prevTodos.filter(item => item.id !== -2))
        }).catch(e => {
            alert(e.response.data.error ? e.response.data.error : e)
        })
    }
    return (
        <ul>
            {todos.map(item => <li key={item.id}>{item.description} <button onClick={() => deleteTask(item)}>Delete</button></li>)}
        </ul>
    )
}