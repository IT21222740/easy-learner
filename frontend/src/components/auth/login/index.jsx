import React, { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../../firebase/auth'
import { useAuth } from '../../../contexts/authContext'
import BgVideo from "../../../assets/hill.mp4";
const Login = () => {
    const { userLoggedIn } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        if(!isSigningIn) {
            setIsSigningIn(true)
            await doSignInWithEmailAndPassword(email, password)
            // doSendEmailVerification()
        }
    }

    const onGoogleSignIn = (e) => {
        e.preventDefault()
        if (!isSigningIn) {
            setIsSigningIn(true)
            doSignInWithGoogle().catch(err => {
                setIsSigningIn(false)
            })
        }
    }

    return (
        <div className="h-screen relative">
            <video
                autoPlay
                loop
                muted
                className="fixed top-0 left-0 w-full h-full object-cover z-[-1]"
            >
                <source src={BgVideo} type="video/mp4" />
            </video>
            <div className="text-white">

            {userLoggedIn && (<Navigate to={'/'} replace={true} />)}
    <main className="w-full h-screen flex self-center place-content-center place-items-center">
    <div className="w-96 space-y-5 p-4 shadow-xl border rounded-xl backdrop-blur-md bg-opacity-30 bg-gray-700">
            <div className="text-center">
                <div className="mt-2">
                    <h3 className="text-white text-xl font-semibold sm:text-2xl">Welcome Back</h3>
                </div>
            </div>
            <form
                onSubmit={onSubmit}
                className="space-y-5"
            >
                <div>
                    <label className="text-sm font-bold">
                        Email
                    </label>
                    <input
                        type="email"
                        autoComplete='email'
                        required
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        className="w-full mt-2 px-3 py-2 text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                    />
                </div>

                <div>
                    <label className="text-sm font-bold">
                        Password
                    </label>
                    <input
    type="password"
    autoComplete='current-password'
    required
    value={password}
    onChange={(e) => { setPassword(e.target.value) }}
    className="w-full mt-2 px-3 py-2 text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
/>

                </div>

                {errorMessage && (
                    <span className='text-red-600 font-bold'>{errorMessage}</span>
                )}

                <button
                    type="submit"
                    disabled={isSigningIn}
                    className={`w-full px-4 py-2 text-white font-medium rounded-lg ${isSigningIn ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`}
                >
                    {isSigningIn ? 'Signing In...' : 'Sign In'}
                </button>
            </form>
            <p className="text-center text-sm">Don't have an account? <Link to={'/register'} className="hover:underline font-bold">Sign up</Link></p>
            <div className='flex flex-row text-center w-full'>
                <div className='border-b-2 mb-2.5 mr-2 w-full'></div><div className='text-sm font-bold w-fit'>OR</div><div className='border-b-2 mb-2.5 ml-2 w-full'></div>
            </div>
            <button
                disabled={isSigningIn}
                onClick={(e) => { onGoogleSignIn(e) }}
                className={`w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium  ${isSigningIn ? 'cursor-not-allowed' : 'hover:bg-gray-100 transition duration-300 active:bg-gray-100'}`}>
                <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* SVG icon */}
                </svg>
                {isSigningIn ? 'Signing In...' : 'Continue with Google'}
            </button>
        </div>
    </main>
</div>


        </div>
    )
}

export default Login