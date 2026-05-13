import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/form.scss'
import { useAuth } from '../hook/use.auth'

export const Login = () => {
    const navigate = useNavigate()
    const { handleLogin } = useAuth()
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            await handleLogin(username, password)
            console.log("Login successful")
            navigate('/')
        } catch (err) {
            alert("Login failed: " + (err.response?.data?.message || "Check your credentials"))
        }
    }

    return (
        <main>
            <div className="form-container">
                <h1> Login </h1>
                <form onSubmit={handleSubmit}>
                    <input onInput={(e) => setUsername(e.target.value)} type="text" name="username" placeholder="Username" />
                    <input onInput={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Password" />
                    <button>Login</button>
                </form>
                <p>Don't have an account? <Link className='toggle-link' to="/register">Register</Link></p>
            </div>
        </main>)
}


export default login