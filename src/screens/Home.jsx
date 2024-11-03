import axios from 'axios'
import {useState, useEffect} from 'react'
import TodoList from '../components/TodoList.jsx'
import { useUser } from '../context/useUser.jsx';
const url = import.meta.env.VITE_API_URL

function Home() {
  const {user} = useUser()
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState("")
  const [loading, setLoading] = useState("Loading...")

  useEffect(()=>{
    const headers = {headers: {Authorization: user.token}}
    axios.get(url + '/get', headers)
    .then(data => {
      setTodos(data.data)
      setLoading("")
    }).catch(e => {
      alert(e.response.data.error ? e.response.data.error : e)
    })
  }, [])

  function addNewTodo(event){
    event.preventDefault()
    const headers = {headers: {Authorization: user.token}}
    setTodos(prevTodos => prevTodos.concat({id: -1, description: "Adding a new task..."}))
    if(newTodo !== ""){
      axios.post(url + '/addnewtask', {
        description: newTodo
      }, headers)
      .then(data => {
        console.log(data.data)
        setTodos(prevTodos => prevTodos.filter(item => item.id !== -1).concat(data.data))
        setNewTodo('')
      }).catch(e => {
        alert(e.response.data.error ? e.response.data.error : e)
      })
    }else(
      alert("the task is empty")
    )
  }

  return (
    <div id="container">
      <h3>Todos</h3>
      <form onSubmit={(event) => addNewTodo(event)}>
        <input 
          type="text" 
          placeholder="Add new task..." 
          value={newTodo} 
          onChange={(event) => setNewTodo(event.target.value)} 
          onKeyDown={(event) => {
            if(event.key === 'Enter'){
              addNewTodo(event)
              setNewTodo('')
            }
          }}/>
        <button type="submit">Add</button>
      </form>
      <div>{loading}</div>
      <TodoList todos={todos} setTodos={setTodos}/>
    </div>
  );
}

export default Home;
