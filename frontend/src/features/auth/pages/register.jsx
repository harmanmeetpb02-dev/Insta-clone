import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'




export const Register = () => {

    const [username , setUsername] = React.useState('')
    const [email , setEmail] = React.useState('')
    const [password , setPassword] = React.useState('')
   

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:3000/api/auth/register', {
                username,
                email,
                password
            },{
                withCredentials: true
            })
            console.log(res.data)
        } catch (err) {
            console.log(err)
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