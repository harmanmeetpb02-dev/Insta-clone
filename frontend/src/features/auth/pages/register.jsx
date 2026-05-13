import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hook/use.auth'

export const Register = () => {
    const navigate = useNavigate()
    const { handleRegister } = useAuth()
    const [username , setUsername] = React.useState('')
    const [email , setEmail] = React.useState('')
    const [password , setPassword] = React.useState('')
   

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            await handleRegister(username, email, password)
            console.log("Registration successful")
            navigate('/login')
        } catch (err) {
            alert("Registration failed: " + (err.response?.data?.message || "Something went wrong"))
        }
    }


  return (
    <main>
    <div className="form-container">
        <h1> Register </h1>
            <form onSubmit={handleSubmit} >
                <input onInput={(e) => setUsername(e.target.value)} type="text" name="username" placeholder="Username" />
                <input onInput={(e) => setEmail(e.target.value)} type="email" name='email' placeholder="Email" />
                <input onInput={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Password" />
                <button>Register</button>
            </form>
        
        <p>Already have an account? <Link className='toggle-link' to="/login">Login</Link></p>
    </div>
</main>
  )
}

export default Register