import {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Goal } from '../requests';
import GoalForm from './GoalForm'

const EditGoalPage = () => {

    const [goalID, setGoalID] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [frequency, setFrequency] = useState()
    const [times, setTimes] = useState(1)
    const [deadline, setDeadline] = useState(new Date())
    const [errors, setErrors] = useState([])

    const navigate = useNavigate()

    const match = {params: useParams()}

    useEffect(() => {
        getGoal()
    }, [])

    const getGoal = () => {
        Goal.show(match.params.id).then((goalData) => {
            const {id, title, description, frequency, times, deadline} = goalData

            setGoalID(id)
            setTitle(title)
            setDescription(description)
            setFrequency(frequency)
            setTimes(times)
            setDeadline(new Date(deadline))
        })
    }

    const updateGoal = (formData) => {
        Goal.update(match.params.id, formData).then(goal => {
            if (goal.errors) {
                setErrors([...goal.errors])
                console.log(goal.errors);
            }else {
                navigate(`/goals/${match.params.id}`)
            }
        })
    }

    return(
        <div className="fixed z-10 w-full h-full left-0 p-16 bg-white">
            <GoalForm
                goalID = {goalID}
                title = {title}
                description = {description}
                frequency = {frequency}
                times = {times}
                deadline = {deadline}
                errors = {errors}

                setTitle={(event)=>setTitle(event)}
                setDescription={(event)=>setDescription(event)}
                setFrequency={(event)=>setFrequency(event)}
                setTimes={(event)=>setTimes(event)}
                setDeadline={(event)=>setDeadline(event)}

                submitForm={(params) => updateGoal(params)}
            />
        </div>
    )
}

export default EditGoalPage