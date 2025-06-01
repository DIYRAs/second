import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [userInput, setUserInput] = useState({
        name: '',
        email: '',
        password: ''
    })
    const { name, email, password } = userInput
    const navigate = useNavigate()

    const handleInput = (e) => {
        const { name, value } = e.target
        setUserInput(prev => ({ ...prev, [name]: value }))
    }

    const handleSignUp = async () => {

        try {
            const response = await fetch("http://localhost/PHP/backend/post/handlesign.php?mode=signup", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            })
            if (response.ok) {
                const data = await response.json()
                console.log(data);
                navigate('/')
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <div className='flex items-center justify-center w-screen h-screen px-7'>
                <fieldset className="p-4 border fieldset bg-base-200 border-base-300 rounded-box w-xs">
                    <legend className="fieldset-legend">Sign Up</legend>

                    <label className="label">Name</label>
                    <input name="name" value={name} onChange={handleInput} type="text" className="mb-4 input" placeholder="Name" />

                    <label className="label">Email</label>
                    <input name="email" value={email} onChange={handleInput} type="email" className="mb-4 input" placeholder="Email" />

                    <label className="label">Password</label>
                    <input name="password" value={password} onChange={handleInput} type="password" className="mb-4 input" placeholder="Password" />

                    <p>Already have an account?
                        <Link to={'/signin'}> <span className="link">Sign in</span> </Link>
                        here</p>

                    <button onClick={handleSignUp} className="mt-4 btn btn-neutral">Sign Up</button>
                </fieldset>
            </div>
        </>
    )
}

export default SignUp