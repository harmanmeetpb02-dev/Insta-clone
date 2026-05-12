import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import '../styles/form.scss'

export const login = () => {

        const [username , setUsername] = React.useState('')
        const [password , setPassword] = React.useState('')

        async function handleSubmit(e) {
            e.preventDefault()
            try {   
                const res = await axios.post('http://localhost:3000/api/auth/login', {
                    username,
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
        <h1> Login </h1>
            <form onSubmit={handleSubmit}>
                <input onInput={(e) => setUsername(e.target.value)} type="text" name="username" placeholder="Username" />
                <input onInput={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Password" />
                <button>Login</button>
            </form>
        <p>Don't have an account? <Link className='toggle-link' to="/register">Register</Link></p>
    </div>
</main>  )
}


export default login