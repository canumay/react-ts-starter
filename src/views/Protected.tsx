import React, { useContext } from 'react'
import { UserContext } from '../App'

function Protected() {
    const {state, dispatch} = useContext(UserContext);
    return (
        <div className="flex items-center justify-center h-screen bg-sinbad font-roboto">
            <div className="flex flex-col justify-center w-11/12 px-10 space-y-12 border lg:w-1/2 h-4/6 2xl:w-4/12 2xl:h-2/6 rounded-xl bg-mosque">
                <h1 className="text-3xl text-center text-white">Welcome to the protected page</h1>
                <h2 className="text-2xl text-white">E-mail Address: {state?.emailAddress}</h2>
                <h2 className="text-2xl text-white">User Logged In?: {state?.isLoggedIn.toString()}</h2>
                <button onClick={() => dispatch?.({type: 'SET_USER_LOGGED_OUT'})} className="w-full p-2 bg-white border text-mosque rounded-xl">Log out</button>
            </div>
        </div>
    )
}

export default Protected
