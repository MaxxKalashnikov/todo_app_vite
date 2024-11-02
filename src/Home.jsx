import './Home.css';
import axios from 'axios'
import {useState, useEffect} from 'react'
import TodoList from './components/TodoList.jsx'
const url = 'http://localhost:3001/'

function Home() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState("")
  const [loading, setLoading] = useState("Loading...")

  useEffect(()=>{
    axios.get(url + 'get')
    .then(data => {
      setTodos(data.data)
      setLoading("")
    }).catch(e => {
      alert(e.response.data.error ? e.response.data.error : e)
    })
  }, [])

  function addNewTodo(event){
    event.preventDefault()
    setTodos(prevTodos => prevTodos.concat({id: -1, description: "Adding a new task..."}))
    if(newTodo !== ""){
      axios.post(url + 'addnewtask', {
        description: newTodo
      })
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
