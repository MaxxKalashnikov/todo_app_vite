import { Link, useNavigate } from 'react-router-dom' 
//import './Authentication.css'
import { useUser } from '../context/useUser'

export const AuthenticationMode = Object.freeze({
    Login: 'Login',
    Register: 'Register'
})

export default function Authentication({authenticationMode}) {
    const {user, setUser, signUp, signIn} = useUser()
    const navigate = useNavigate()

    const handleSubmit = async(event) => {
        event.preventDefault()
        try {
            if(authenticationMode === AuthenticationMode.Register){
                await signUp()
                navigate('/signin')
            }else{
                await signIn()
                navigate('/pipi')
            }
        } catch (error) {
            const message = error.response && error.response.data ? error.response.data.error : error
            alert(message)
        }
    }
    return (
        <div>
            <h3>{authenticationMode === AuthenticationMode.Login ? 'Sign in' : 'Sign up'}</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input type='email' value={user.email} onChange={event => setUser({...user, email: event.target.value})}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type='password' value={user.password} onChange={event => setUser({...user, password: event.target.value})}/>
                </div>
                <div>
                    <button>{authenticationMode === AuthenticationMode.Login ? 'Login' : 'Submit'}</button>
                </div>
                <div>
                    <Link to={authenticationMode === AuthenticationMode.Login ? '/signup' : '/signin'}>
                        {authenticationMode === AuthenticationMode.Login ? 'No account? Sign up' : 'Already signed up? Sign in'}
                    </Link>
                </div>
            </form>
        </div>
    )
}
