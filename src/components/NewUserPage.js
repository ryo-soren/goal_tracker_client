import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../requests"
import UserForm from './UserForm';

const NewUserPage = props => {
    const {getCurrentUser} = props
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState()
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])

    const navigate = useNavigate()

    const createUser = params => {
        User.create(params).then(user => {
            if (user.errors) {
                setErrors([...user.errors])
                console.log(user.errors);
            } else {
                getCurrentUser()
                navigate('/')
            }
        })
    }

    return(
        <UserForm 
            firstname={firstname}
            lastname={lastname}
            email={email}
            username={username}
            password={password}
            passwordConfirmation={passwordConfirmation}
            errors={errors}
            
            setFirstname={(event) => setFirstname(event)}
            setLastname={(event) => setLastname(event)}
            setEmail={(event) => setEmail(event)}
            setUsername={(event) => setUsername(event)}
            setPassword={(event) => setPassword(event)}
            setPasswordConfirmation={(event) => setPasswordConfirmation(event)}
            setErrors={(event) => setErrors(event)}

            submitForm={(params) => createUser(params)}
        />
    )
}

export default NewUserPage