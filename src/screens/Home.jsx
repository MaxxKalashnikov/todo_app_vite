import '../styles/Home.css'
import axios from 'axios'
import {useState, useEffect} from 'react'
import TodoList from '../components/TodoList.jsx'
import { useUser } from '../context/useUser.jsx';
import ErrorNotification from '../components/ErrorNotification.jsx';
const url = import.meta.env.VITE_API_URL

function Home() {
  const {user, logOut, getToken} = useUser()
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState("")
  const [loading, setLoading] = useState("Loading...")
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(()=>{
    const headers = {headers: {Authorization: user.token}}
      axios.post(url + '/get', {
        email: user.email
      }, headers)
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
    if(newTodo !== "" && newTodo.length !== 0){
      setTodos(prevTodos => prevTodos.concat({id: -1, description: "Adding a new task..."}))
      axios.post(url + '/addnewtask', {
        description: newTodo,
        email: user.email
      }, headers)
      .then(data => {
        console.log(data.data)
        setTodos(prevTodos => prevTodos.filter(item => item.id !== -1).concat(data.data))
        setNewTodo('')
      }).catch(e => {
        // alert(e.response.data.error ? e.response.data.error : e)
        setNotificationMessage("You session has expired. Please log out and sign in again")
      })
    } else {
      setNotificationMessage("the task is empty");
      setTimeout(() => {
        setNotificationMessage(null);
      }, 3000);
    }
  }

  return (
    <div id="container">
      <ErrorNotification message={notificationMessage} type="error"/>
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
