import {Goal} from "../requests"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import GoalShowView from "./GoalShowView.js";

const GoalShowPage = () => {
    const [goal, setGoal] = useState({})
    const match = {params: useParams()}

    useEffect(() => {
        getGoal()
    }, [])

    function getGoal(){
        Goal.show(match.params.id).then((goalData) => {
            if (goalData.errors) {
                console.log(goalData.errors);
            }else{
                setGoal(goalData)
            }
        })
    }

    return(
            <GoalShowView
            goal = {goal}
            setGoal = {(e) => setGoal(e)}
            />    
        )
    }

export default GoalShowPage