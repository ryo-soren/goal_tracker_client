import {Goal} from "../requests.js"
import {useState, useEffect} from "react";
import "./styles/index.css";
import Dashboard from "./Dashboard.js";
import GoalIndexView from "./GoalIndexView.js";
import cn from "./dashboard/utils/cn.js";

const GoalIndexPage = props => {

    const [goals, setGoals] = useState([])
    const {showGoals, setShowGoals} = props

    useEffect(() => {
        getGoals()
    }, [])

    function getGoals(){
        Goal.index().then((goalsData) => {
            setGoals(goalsData)
        })
    }

    return(
        <>
        <div className="flex bg-gray-100 h-full overflow-y-auto">
            <div className="sidebar bg-white h-full w-[14.3%] absolute z-0">
              <div 
              className={cn("tab hover:cursor-pointer", showGoals ? "hover" : "green")}
              onClick={() => {
              setShowGoals(false)
              }}
              >
                <span className="icon">🏠</span><span>Dashboard</span>
              </div>
              <div
              className={cn("tab hover:cursor-pointer", showGoals ? "green" : "hover")}
              onClick={() => {
              setShowGoals(true)
              }}
              >
                <span className="icon">✅</span><span>Goals</span>
              </div>
            </div>
            <div className='flex-1 ml-[14.3vw] h-max'>
                {
                    showGoals ? (
                            <GoalIndexView
                            goals = {goals}
                            setGoals = {(event) => setGoals(event)}
                            />
                        ) : (
                            <Dashboard goals={goals}/>
                    )
                }
            </div>
        </div>
        </>


    )
}

export default GoalIndexPage