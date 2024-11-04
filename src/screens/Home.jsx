import axios from 'axios'
import {useState, useEffect} from 'react'
import TodoList from '../components/TodoList.jsx'
import { useUser } from '../context/useUser.jsx';
import { Navigate, Outlet } from "react-router-dom";
import ErrorNotification from '../components/ErrorNotification.jsx';
const url = import.meta.env.VITE_API_URL

function Home() {
  const {user, logOut} = useUser()
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState("")
  const [loading, setLoading] = useState("Loading...")
  const [norificationMessage, setNotificationMessage] = useState('')

  useEffect(()=>{
    const headers = {headers: {Authorization: user.token}}
    axios.get(url + '/get', headers)
    .then(data => {
      setTodos(data.data)
      setLoading("")
    }).catch(e => {
      //alert(e.response.data.error ? e.response.data.error : e)
      setNotificationMessage("You session has expired. Please log out and sign in again")
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
        // alert(e.response.data.error ? e.response.data.error : e)
        setNotificationMessage("You session has expired. Please log out and sign in again")
      })
    }else(
      alert("the task is empty")
    )
  }

  return (
    <div id="container">
      <ErrorNotification message={norificationMessage}/>
      <h3>Todos</h3>
      <button onClick={() => logOut()}>Log out</button>
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
      <TodoList todos={todos} setTodos={setTodos} setNotificationMessage={setNotificationMessage}/>
    </div>
  );
}

export default Home;
