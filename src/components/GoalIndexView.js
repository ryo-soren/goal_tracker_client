import {Goal} from "../requests.js"
import { Link } from "react-router-dom";
import cn, { capitalizeFirstLetter } from "./dashboard/utils/cn.js";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { findTypeByGoal, types } from "./dashboard/utils/dates.js";
import { goalProgress } from "./dashboard/utils/percentage.js";
import { useState, useEffect } from "react";
import { IoIosArrowForward, IoIosArrowRoundDown } from "react-icons/io";
import Overlay from "./Overlay.js";
import Sort from "./Sort.js";

const GoalIndexView = props => {
    const [expanded, setExpanded] = useState({"active": true})
    const [active, setActive] = useState([])
    const [oneTime, setOneTime] = useState([])
    const [recurring, setRecurring] = useState([])
    const [displayFilter, setDisplayFilter] = useState(false)
    const [toSort, setToSort] = useState({})
    const [currentChange, setCurrentChange] = useState("")
    const {goals, setGoals} = props

    useEffect(() => {
        setActive(goals.filter(g => goalProgress(g) < 100).sort((a, b) => {
            if (!toSort["active"]) {
                return 0
            }else if (toSort["active"] === "deadline" || toSort["active"] === "created_at") {
                if (new Date(a[toSort["active"]]) < new Date(b[toSort["active"]])) {
                    return -1;
                }
                if (new Date(a[toSort["active"]]) > new Date(b[toSort["active"]])) {
                    return 1;
                }
                if (a.title < b.title) {
                    return -1
                }
                if (a.title > b.title) {
                    return 1
                }
                return 0;                
            } else if(toSort["active"] === "success_rate") {
                const successRateA = ((a.done/a.times)*100).toFixed(0)
                const successRateB = ((b.done/b.times)*100).toFixed(0)
                if (successRateA > successRateB) {
                    return -1;
                }
                if (successRateA < successRateB) {
                    return 1;
                }
                if (a.title < b.title) {
                    return -1
                }
                if (a.title > b.title) {
                    return 1
                }
                return 0;                
            }else {            
                if (a[toSort["active"]] < b[toSort["active"]]) {
                    return -1;
                }
                if (a[toSort["active"]] > b[toSort["active"]]) {
                    return 1;
                }
                if (a.title < b.title) {
                    return -1
                }
                if (a.title > b.title) {
                    return 1
                }
                return 0;
            }         
        }))
        setOneTime(goals.filter(g => goalProgress(g) >= 100 && g.frequency === "one_time").sort((a, b) => {
            if (!toSort["one_time"]) {
                return 0
            }else if (toSort["one_time"] === "deadline" || toSort["one_time"] === "created_at") {
                if (new Date(a[toSort["one_time"]]) < new Date(b[toSort["one_time"]])) {
                    return -1;
                }
                if (new Date(a[toSort["one_time"]]) > new Date(b[toSort["one_time"]])) {
                    return 1;
                }
                if (a.title < b.title) {
                    return -1
                }
                if (a.title > b.title) {
                    return 1
                }
                return 0;                
            } else if  (toSort["one_time"] === "success_rate") {
                    if (a.times > b.times) {
                        return -1
                    }
                    if (a.times < b.times) {
                        return 1
                    }
                    if (a.title < b.title) {
                        return -1
                    }
                    if (a.title > b.title) {
                        return 1
                    }
                    return 0;
            }else {            
                if (a[toSort["one_time"]] < b[toSort["one_time"]]) {
                    return -1;
                }
                if (a[toSort["one_time"]] > b[toSort["one_time"]]) {
                    return 1;
                }
                if (a.title < b.title) {
                    return -1
                }
                if (a.title > b.title) {
                    return 1
                }
                return 0;
            }         
        }))
        setRecurring(goals.filter(g => goalProgress(g) >= 100 && g.frequency !== "one_time").sort((a, b) => {
            if (!toSort["recurring"]) {
                return 0
            }else if (toSort["recurring"] === "deadline" || toSort["recurring"] === "created_at") {
                if (new Date(a[toSort["recurring"]]) < new Date(b[toSort["recurring"]])) {
                    return -1;
                }
                if (new Date(a[toSort["recurring"]]) > new Date(b[toSort["recurring"]])) {
                    return 1;
                }
                if (a.title < b.title) {
                    return -1
                }
                if (a.title > b.title) {
                    return 1
                }
                return 0;                
            } else if (toSort["recurring"] === "success_rate"){
                const successRateA = (a.successful/(a.unsuccessful + a.successful)*100).toFixed(0)
                const successRateB = (b.successful/(b.unsuccessful + b.successful)*100).toFixed(0)
                if (successRateA > successRateB) {
                    return -1;
                }
                if (successRateA < successRateB) {
                    return 1;
                }
                if (a.title < b.title) {
                    return -1
                }
                if (a.title > b.title) {
                    return 1
                }
                return 0;
            }else {            
                if (a[toSort["recurring"]] < b[toSort["recurring"]]) {
                    return -1;
                }
                if (a[toSort["recurring"]] > b[toSort["recurring"]]) {
                    return 1;
                }
                if (a.title < b.title) {
                    return -1
                }
                if (a.title > b.title) {
                    return 1
                }
                return 0;
            }         
        }))
        console.log("re-rendered");
    }, [goals])

    // expands the container that holds the given goals
    const toggleExpanded = (goalStatus) => setExpanded({...expanded, [goalStatus]: !expanded[goalStatus]})

    // shows and hides the overlay screen
    const toggleFilter = () => setDisplayFilter(!displayFilter)

    function markDone(goalData){
        const doneUpdatedJson = {
            completion: true,
            done: parseInt(goalData.done + 1)
        }

        Goal.update(goalData.id, doneUpdatedJson).then(goal => {
            if (goal.errors) {
                console.log(goal.errors);
            } else {
                Goal.index().then(g => {
                    setGoals(g)
                })
            }
        })
    }

    const sortGoalList = (type, sortBy, order = null) => {
        let sortedArray;

        switch (type) {
            case "active":
                sortedArray = [...active];
                break;
    
            case "one_time":
                sortedArray = [...oneTime];
                break;
    
            case "recurring":
                sortedArray = [...recurring];
                break;
    
            default:
                break;
        }

        sortedArray.sort((a, b) => {
            if (sortBy === "deadline" || sortBy === "created_at") {
                if (new Date(a[sortBy]) < new Date(b[sortBy])) {
                    return -1;
                }
                if (new Date(a[sortBy]) > new Date(b[sortBy])) {
                    return 1;
                }
                if (a.title < b.title) {
                    return -1
                }
                if (a.title > b.title) {
                    return 1
                }
                return 0;
            } else if(sortBy === "success_rate"){
                if (type === "active") {
                    const successRateA = ((a.done/a.times)*100).toFixed(0)
                    const successRateB = ((b.done/b.times)*100).toFixed(0)
                    if (successRateA > successRateB) {
                        return -1;
                    }
                    if (successRateA < successRateB) {
                        return 1;
                    }
                    if (a.title < b.title) {
                        return -1
                    }
                    if (a.title > b.title) {
                        return 1
                    }
                    return 0;
                }else if (type === "recurring") {
                    const successRateA = (a.successful/(a.unsuccessful + a.successful)*100).toFixed(0)
                    const successRateB = (b.successful/(b.unsuccessful + b.successful)*100).toFixed(0)
                    if (successRateA > successRateB) {
                        return -1;
                    }
                    if (successRateA < successRateB) {
                        return 1;
                    }
                    if (a.title < b.title) {
                        return -1
                    }
                    if (a.title > b.title) {
                        return 1
                    }
                    return 0;
                }else {
                    if (a.times > b.times) {
                        return -1
                    }
                    if (a.times < b.times) {
                        return 1
                    }
                    if (a.title < b.title) {
                        return -1
                    }
                    if (a.title > b.title) {
                        return 1
                    }
                    return 0;
                }
            }else {
                if (a[sortBy] < b[sortBy]) {
                    return -1;
                }
                if (a[sortBy] > b[sortBy]) {
                    return 1;
                }
                if (a.title < b.title) {
                    return -1
                }
                if (a.title > b.title) {
                    return 1
                }
                return 0;
            }
        });
    
        switch (type) {
            case "active":
                setActive(sortedArray);
                break;
    
            case "one_time":
                setOneTime(sortedArray);
                break;
    
            case "recurring":
                setRecurring(sortedArray);
                break;
    
            default:
                break;
        }
    }

    return(
        <>
        {
            displayFilter ? (
                <Overlay
                component = {
                    <Sort
                        sortGoalList = {sortGoalList}
                        currentChange = {currentChange}
                        toSort = {toSort}
                        setToSort = {(event) => setToSort(event)}
                        expanded = {expanded}
                        setExpanded = {(event) => setExpanded(event)}
                        toggleFilter = {toggleFilter}
                    />
                }
                setDisplay = {() => toggleFilter()}
                />
            ) : ("")
        }
            <div className="h-max border border-[#B1B1B1] bg-white rounded m-5">
                <div className="flex justify-around rounded-t border-b border-[#B1B1B1] mx-6 sticky z-10 top-0 bg-white">
                    {types.map(({type}) => {
                        const underscoreRemoved = capitalizeFirstLetter(type.replace("_", " "))
                        return(
                            <div key={type} className="flex items-center font-bold text-[#b1b1b1] text-xs my-4">
                                <div className={cn("rounded-full h-6 w-6 mr-2", `${type}`)}></div>
                                <h1>{underscoreRemoved}</h1>
                            </div>
                        )
                    })}
                </div>

                <div className="flex items-center justify-between m-6 px-6">
                    <div className="flex items-center gap-5">
                        <div 
                        onClick={() => toggleExpanded("active")} 
                        className={cn(`hover:cursor-pointer flex justify-center items-center rounded-full border border-[#4CAF4F] text-[#4CAF4F] w-8 h-8 arrow ${expanded["active"] === true ? "arrow-vertical" : ""}`)}>
                            <IoIosArrowForward/>
                        </div>
                        <div className="bg-[#4CAF4F] text-white px-6 py-1 rounded-lg select-none">Active</div>
                    </div>
                    <div 
                    onClick={() => {
                        toggleFilter()
                        setCurrentChange("active")
                    }}
                    className="w-max border border-[#4CAF4F] text-[#4CAF4F] rounded-lg px-6 py-1 select-none hover:cursor-pointer hover:text-white hover:bg-[#4CAF4F]">{toSort["active"] ? <div className="flex items-center gap-2">{capitalizeFirstLetter(toSort["active"].replace("_", " "))} <IoIosArrowRoundDown/></div>: "Sort"}</div>
                </div>
                <div className={`wrapper border-b ${expanded["active"] === true ? "is-open pb-5" : ""}`}>
                    <div className="inner select-none">
                        {active.map((g) => {
                            return(
                                <div key={g.id} className="border-t border-[#B1B1B1] flex pl-6 py-1 mx-6">
                                    <h1 className="whitespace-nowrap overflow-hidden flex w-1/3 items-center font-medium"><Link to={`/goals/${g.id}`}>{g.title}</Link></h1>
                                    <div className="w-2/3 grid grid-rows-2 grid-cols-3 text-sm text-center items-center font-bold text-[#b1b1b1]">
                                        <div>Deadline</div>
                                        <div>Mark Done</div>
                                        <div>Progress</div>
                                        <div className="text-black font-normal">{new Date(g.deadline).toDateString()}</div>
                                        <div>{g.done >= g.times ? ("Completed") : (<button onClick={()=> markDone(g)}>✅</button>)}</div>
                                        <div className="flex flex-col items-center">
                                            <div className="w-1/5">
                                                <CircularProgressbar 
                                                value={`${goalProgress(g)}`}
                                                text={`${g.done}/${g.times}`}
                                                background
                                                backgroundPadding={6}
                                                styles={buildStyles(
                                                    {
                                                        backgroundColor: `#${findTypeByGoal(g)["color"]}`,
                                                        textColor: `#fff`,
                                                        pathColor: "#fff",
                                                        trailColor: `transparent`
                                                    }
                                                )}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="flex items-center justify-between m-6 px-6">
                    <div className="flex items-center gap-5">
                        <div 
                        onClick={() => toggleExpanded("one_time")} 
                        className={cn(`hover:cursor-pointer flex justify-center items-center rounded-full border border-[#4CAF4F] text-[#4CAF4F] w-8 h-8 arrow ${expanded["one_time"] === true ? "arrow-vertical" : ""}`)}>
                            <IoIosArrowForward/>
                        </div>
                        <div className="bg-[#4CAF4F] text-white px-6 py-1 rounded-lg select-none">Completed - One Time</div>
                    </div>
                    <div 
                    onClick={() =>{
                        toggleFilter()
                        setCurrentChange("one_time")
                    }} 
                    className="w-max border border-[#4CAF4F] text-[#4CAF4F] rounded-lg px-6 py-1 select-none hover:cursor-pointer hover:text-white hover:bg-[#4CAF4F]">{toSort["one_time"] ? <div className="flex items-center gap-2">{capitalizeFirstLetter(toSort["one_time"].replace("_", " "))} <IoIosArrowRoundDown/></div> : "Sort"}</div>
                </div>
                <div className={`wrapper border-b ${expanded["one_time"] === true ? "is-open pb-5 border-b" : ""}`}>
                    <div className="inner">
                        {oneTime.map((g) => {
                            return(
                                <div key={g.id} className="border-t border-[#B1B1B1] flex pl-6 py-1 mx-6">
                                    <h1 className="whitespace-nowrap overflow-hidden flex w-1/3 items-center font-medium"><Link to={`/goals/${g.id}`}>{g.title}</Link></h1>
                                    <div className="w-2/3 grid grid-rows-2 grid-cols-3 text-sm text-center items-center font-bold text-[#b1b1b1]">
                                        <div>Deadline</div>
                                        <div>Mark Done</div>
                                        <div>Target Reached</div>
                                        <div className="font-normal text-black">{new Date(g.deadline).toDateString()}</div>
                                        <div>{g.done >= g.times ? ("Completed") : (<button onClick={()=> markDone(g)}>✅</button>)}</div>
                                        <div className="flex flex-col items-center">
                                            <div className="w-1/5">
                                                <CircularProgressbar 
                                                value={`${goalProgress(g)}`}
                                                text={`${g.done}/${g.times}`}
                                                background
                                                backgroundPadding={6}
                                                styles={buildStyles(
                                                    {
                                                        backgroundColor: `#${findTypeByGoal(g)["color"]}`,
                                                        textColor: `#fff`,
                                                        pathColor: "#fff",
                                                        trailColor: `transparent`
                                                    }
                                                )}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="flex items-center justify-between m-6 px-6">
                    <div className="flex items-center gap-5">
                        <div 
                        onClick={() => toggleExpanded("recurring")} 
                        className={cn(`hover:cursor-pointer flex justify-center items-center rounded-full border border-[#4CAF4F] text-[#4CAF4F] w-8 h-8 arrow ${expanded["recurring"] === true ? "arrow-vertical" : ""}`)}>
                            <IoIosArrowForward/>
                        </div>
                        <div className="bg-[#4CAF4F] text-white px-6 py-1 rounded-lg select-none">Completed - Recurring</div>
                    </div>
                    <div 
                    onClick={() =>{
                        toggleFilter()
                        setCurrentChange("recurring")
                    }}
                    className="w-max border border-[#4CAF4F] text-[#4CAF4F] rounded-lg px-6 py-1 select-none hover:cursor-pointer hover:text-white hover:bg-[#4CAF4F]">{toSort["recurring"] ? <div className="flex items-center gap-2">{capitalizeFirstLetter(toSort["recurring"].replace("_", " "))} <IoIosArrowRoundDown/></div> : "Sort"}</div>
                </div>
                <div className={`wrapper ${expanded["recurring"] === true ? "is-open pb-5" : ""}`}>
                    <div className="inner">
                        {recurring.map((g) => {
                            const successRate = (g.successful/(g.unsuccessful + g.successful)*100).toFixed(0)
                            return(
                                <div key={g.id} className="border-t border-[#B1B1B1] flex pl-6 py-1 mx-6">
                                    <h1 className="whitespace-nowrap overflow-hidden flex w-1/3 items-center font-medium"><Link to={`/goals/${g.id}`}>{g.title}</Link></h1>
                                    <div className="w-2/3 grid grid-rows-2 grid-cols-3 text-sm text-center items-center font-bold text-[#b1b1b1]">
                                        <div>Deadline</div>
                                        <div>Mark Done</div>
                                        <div>Success Rate</div>
                                        <div className="font-normal text-black">{(new Date(g.deadline)).toDateString()}</div>
                                        <div>{g.done >= g.times ? ("Completed") : (<button onClick={()=> markDone(g)}>✅</button>)}</div>
                                        <div className="flex flex-col items-center">
                                            <div className="w-1/5">
                                            <CircularProgressbar
                                                value={successRate}
                                                strokeWidth={50}
                                                styles={buildStyles({
                                                    strokeLinecap: "butt",
                                                    pathColor:`#${findTypeByGoal(g)["color"]}`,
                                                })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default GoalIndexView