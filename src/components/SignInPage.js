import {useState} from "react";
import { Session } from "../requests";
import { Link, useNavigate } from "react-router-dom";

const SignInPage = props => {
    const {getCurrentUser} = props
    const [usernameOrEmail, setUsernameOrEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const getDataAndSubmit = event => {
        event.preventDefault()

        const formData = {
            username_or_email: usernameOrEmail,
            password: password
        }

        Session.create(formData).then((user) => {
            if (user.status === 401) {
                console.log(user.message)
            } else {
                console.log(user);
                getCurrentUser()
                navigate(`/`)
            }
        })
    }

    return(
        <div className="flex flex-col h-full mt-5 items-center mx-auto gap-10 text-slate-700">
            <div className="w-20 h-20 rounded-full bg-[#4CAF4F] flex justify-center items-center relative">
                <div className="absolute w-[60%] h-[30%] border-white border-b-[.5rem] border-l-[.5rem] rotate-[310deg] translate-x-[-5%] translate-y-[-25%]"></div>
            </div>
            <h1 className="font-medium text-[1.5rem]">Sign in to Goal Tracker</h1>
            <form onSubmit={getDataAndSubmit} className="flex flex-col gap-5 border border-[#4CAF4F] rounded-lg p-5 w-full select-none">
                <div>
                    <label htmlFor="usernameOrEmail">Username or Email</label>
                    <br />
                    <input type="text" name="usernameOrEmail" id="usernameOrEmail" value={usernameOrEmail} 
                    className="rounded border border-[#4CAF4F] focus:outline-[#4CAF4F] w-full"
                    onChange={event=> setUsernameOrEmail(event.currentTarget.value)}/>                
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <br />
                    <input type="password" name="password" id="password" value={password} 
                    className="rounded border border-[#4CAF4F] focus:outline-[#4CAF4F] w-full"
                    onChange={event=> setPassword(event.currentTarget.value)}/>
                </div>
                <button className="bg-[#4CAF4F] text-white border-none rounded-full px-4 hover:cursor-pointer w-full" type="submit">Submit</button>
            </form>
            <h1 className="w-full border border-[#4CAF4F] rounded-lg p-5">New to Goal Tracker? <Link to={"/sign_up"} className="text-[#4CAF4F] hover:underline">Create an account</Link></h1>
        </div>
    )
}

export default SignInPage