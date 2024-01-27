import {useState} from "react";
import { Goal } from '../requests';
import GoalForm from './GoalForm'

const NewGoalPage = (props) => {
    const {setDisplay} = props
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [frequency, setFrequency] = useState()
    const [times, setTimes] = useState(1)
    const [deadline, setDeadline] = useState(new Date(new Date().getTime() + (24 * 60 * 60 * 1000)))
    const [errors, setErrors] = useState()

    function createNewGoal(params) {
        Goal.create(params).then(goal => {
            if (goal.errors) {
                setErrors([...goal.errors])
                console.log(goal.errors);
            } else {
                setDisplay(false)
                window.location.reload();
            }
        })
    }

    return(
        <div className="bg-white h-[90%] w-[95%] flex flex-col py-16 rounded-xl mx-auto fixed z-10">
            <GoalForm
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
                setDisplay={()=>setDisplay(false)}

                submitForm={(params) => createNewGoal(params)}
            />
        </div>
    )
}

export default NewGoalPage