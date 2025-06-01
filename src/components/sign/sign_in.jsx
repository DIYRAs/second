import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const SignIn = () => {
    const [userInput, setUserInput] = useState({
        name: '',
        password: ''
    })
    const { name, password } = userInput
    const navigate = useNavigate()

    const handleInput = (e) => {
        const { name, value } = e.target
        setUserInput(prev => ({ ...prev, [name]: value }))
    }

    const handleSignIn = async () => {
        try {
            const response = await fetch('http://localhost/PHP/backend/post/handlesign.php?mode=signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    password: password
                })
            })
            const data = await response.json()

            if (response.ok) {
                console.log(data)
                navigate('/')
            } else {
                console.log("Failed: ", data)
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className='flex items-center justify-center w-screen h-screen px-7'>
            <fieldset className="p-4 border fieldset bg-base-200 border-base-300 rounded-box w-xs">
                <legend className="fieldset-legend">Sign In</legend>

                <label className="label">Name</label>
                <input name="name" type="text" className="mb-4 input" placeholder="Name"
                    value={name} onChange={handleInput} />

                <label className="label">Password</label>
                <input name="password" type="password" className="mb-4 input" placeholder="Password"
                    value={password} onChange={handleInput} />

                <p>Dont have an account?<Link to={'/signup'}> <span className="link">Sign up</span> </Link> here</p>

                <button className="mt-4 btn btn-neutral"
                    onClick={handleSignIn}>Sign In</button>
            </fieldset>
        </div>
    )
}

export default SignIn