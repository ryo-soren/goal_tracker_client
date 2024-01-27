import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Session, User } from "../requests"
import UserForm from './UserForm';

const EditUserPage = props => {
    const {getCurrentUser} = props
    const [userID, setUserID] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        fetchCurrentUser()
    }, [])

    const fetchCurrentUser = () => {
        Session.current().then(currentUserData => {
            const {id, first_name, last_name, email, username, password } = currentUserData

            setUserID(id)
            setFirstname(first_name)
            setLastname(last_name)
            setEmail(email)
            setUsername(username)
            setPassword(password)
            setPasswordConfirmation(password)
        })
    }


    const updateUser = params => {
        User.update(userID, params).then(user => {
            if (user.errors) {
                console.log(user.errors);
            } else {
                getCurrentUser()
                navigate('/')
            }
        })
    }

    return(
        <div className="fixed z-10 w-full left-0 p-16 bg-white">
            <UserForm
                userID={userID}
                firstname={firstname}
                lastname={lastname}
                email={email}
                username={username}
                password={password}
                passwordConfirmation={passwordConfirmation}
                
                setFirstname={(event) => setFirstname(event)}
                setLastname={(event) => setLastname(event)}
                setEmail={(event) => setEmail(event)}
                setUsername={(event) => setUsername(event)}
                setPassword={(event) => setPassword(event)}
                setPasswordConfirmation={(event) => setPasswordConfirmation(event)}
    
                submitForm={(params) => updateUser(params)}
            />
        </div>
    )
}

export default EditUserPage