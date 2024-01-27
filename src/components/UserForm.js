import { Link } from "react-router-dom"
import FormErrors from "./FormErrors"

const UserForm = props => {

    const {
        userID, firstname, lastname, email, username, password, passwordConfirmation,
        setFirstname, setLastname, setEmail, setUsername, setPassword, setPasswordConfirmation,
        submitForm, errors
    } = props

    const getDataAndSubmit = (event) => {
        event.preventDefault()
        let formData = {}
        if (password) {
            formData = {
                first_name: firstname,
                last_name: lastname,
                email: email,
                username: username,
                password: password,
                password_confirmation: passwordConfirmation
            }   
        } else {
            formData = {
                first_name: firstname,
                last_name: lastname,
                email: email,
                username: username
            }  
        }
        submitForm(formData)
    }

    return (
        <div className="h-[100vh] relative inset-0 flex flex-col w-max mt-5 items-center mx-auto gap-5 text-slate-700">
            <div className="w-20 h-20 rounded-full bg-[#4CAF4F] flex justify-center items-center relative">
                <div className="absolute w-[60%] h-[30%] border-white border-b-[.5rem] border-l-[.5rem] rotate-[310deg] translate-x-[-5%] translate-y-[-25%]"></div>
            </div>
            {
                userID ? (
                    <h1 className="font-medium text-[1.5rem] px-5">Edit User</h1>
                ) : (
                    <h1 className="font-medium text-[1.5rem] px-5">Sign Up for Goal Tracker</h1>
                )
            }
            <form className="flex flex-col gap-5 border border-[#4CAF4F] rounded-lg p-5 w-full select-none" onSubmit={getDataAndSubmit}>
                <div className="flex flex-col">
                    <label htmlFor="firstname">First Name</label>
                    <input className="border border-[#4CAF4F] focus:outline-[#4CAF4F] rounded w-full" type="text" name="firstname" id="firstname" value={firstname} onChange={event=> setFirstname(event.currentTarget.value)} required/>
                    <FormErrors forField="first_name" errors={errors}/>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="lastname">Last Name</label>
                    <input className="border border-[#4CAF4F] focus:outline-[#4CAF4F] rounded w-full" type="text" name="lastname" id="lastname" value={lastname} onChange={event=> setLastname(event.currentTarget.value)} required/>
                    <FormErrors forField="last_name" errors={errors}/>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input className="border border-[#4CAF4F] focus:outline-[#4CAF4F] rounded w-full" type="text" name="email" id="email" value={email} onChange={event=> setEmail(event.currentTarget.value)} required/>                
                    <FormErrors forField="email" errors={errors}/>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="username">Username</label>
                    <input className="border border-[#4CAF4F] focus:outline-[#4CAF4F] rounded w-full" type="text" name="username" id="username" value={username} onChange={event=> setUsername(event.currentTarget.value)}/>                
                    <FormErrors forField="username" errors={errors}/>
                </div>
                {
                    userID ? "" :
                    <>
                        <div className="flex flex-col">
                            <label htmlFor="password">Password</label>
                            <input className="border border-[#4CAF4F] focus:outline-[#4CAF4F] rounded w-full" type="password" name="password" id="password" value={password} onChange={event=> setPassword(event.currentTarget.value)} required/>
                            <FormErrors forField="password" errors={errors}/>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="passwordConfirmation">Password Confirmation</label>
                            <input className="border border-[#4CAF4F] focus:outline-[#4CAF4F] rounded w-full" type="password" name="passwordConfirmation" id="passwordConfirmation" value={passwordConfirmation} onChange={event=> setPasswordConfirmation(event.currentTarget.value)} required/>
                            <FormErrors forField="password_confirmation" errors={errors}/>
                        </div>
                    </>
                }
                <button className="bg-[#4CAF4F] text-white border-none rounded-full px-4 w-full">Submit</button>
            </form>
            {
                userID ? ("") : (
                    <Link to={"/login"} className="border border-[#4CAF4F] w-full rounded-lg px-5 py-3 text-[#4CAF4F] text-center hover:underline">Return to Login</Link>
                )
            }


        </div>
    )
}

export default UserForm