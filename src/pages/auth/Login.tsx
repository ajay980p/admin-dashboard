import React from 'react'

const Login = () => {
    return (
        <div>
            <h2>Login</h2>
            <input placeholder='Username' />
            <input placeholder='Password' />
            <button>login</button>
            <label htmlFor='remember-me'>Remember me</label>
            <input type='checkbox' id='remember-me' />
        </div>
    )
}

export default Login