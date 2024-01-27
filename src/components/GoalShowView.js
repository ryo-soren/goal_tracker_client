import {Goal} from "../requests"
import { useState } from "react"
import {useNavigate} from "react-router-dom";
import cn, { capitalizeFirstLetter, nextDeadline } from "./dashboard/utils/cn";
import { dates, findTypeByGoal, isSelected, filterCompletionsByDate, days, months, matchDeadline } from "./dashboard/utils/dates.js";
import dayjs from "dayjs";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import Overlay from "./Overlay.js";

const GoalShowView = (props) => {

    const {goal, setGoal} = props
    const currentDate = dayjs()
    const [selected, setSelected] = useState(currentDate)
    const [display, setDisplay] = useState(false)
    const navigate = useNavigate()
    const type = findTypeByGoal(goal)
    const completions = goal.completions
    const progress = ((goal.done / goal.times) * 100).toFixed(0)
    const successRate = (goal.successful/(goal.unsuccessful + goal.successful)*100).toFixed(0)


    function markDone(goalData){
        const doneUpdatedJson = {
            completion: true,
            done: parseInt(goalData.done + 1)
        }

        Goal.update(goalData.id, doneUpdatedJson).then(goal => {
            if (goal.errors) {
                console.log(goal.errors);
            } else {
                Goal.show(goalData.id).then(g => {
                    setGoal(g)
                })
            }
        })
    }

    function deleteGoal(id) {
        Goal.destroy(id).then(g =>{
            if (g.errors) {
                console.log(g.errors);
            } else {
                setDisplay(false)
                navigate("/goals")
                setTimeout(() => {
                    alert(`Goal #${goal.id} deleted - Title: ${goal.title}`)
                }, 500);
            }
        })
    }

    const DeleteGoal = () => {
        return(
            <div className="flex flex-col gap-8 fixed z-10 p-10 w-max rounded-lg bg-white">
                <h1>Please select "Confirm" to delete this goal.</h1>
                <small className="whitespace-nowrap">This will permanently delete the goal from your records</small>
                <div className="flex justify-between">
                    <button className="border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white rounded-full px-4" onClick={() => setDisplay(false)}>Cancel</button>
                    <button className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-full px-4" onClick={() => deleteGoal(goal.id)}>Confirm</button>
                </div>
            </div>
        )
    }

    return(
            <>
            {
                display ? (
                    <Overlay
                    setDisplay = {setDisplay}
                    component = {<DeleteGoal/>}
                    />
                ) : ""
            }
            <div className="w-full bg-white relative z-10">
                <div className="flex h-max border-b bg-stone-100 sticky top-0">
                    <div className="w-2/3 px-20 flex items-center justify-between border-r">
                        <h1 className={`text-[1.5rem] rounded-lg px-4 select-none ${goal.done === goal.times ? "bg-[#4CAF4F] text-white" : "border border-[#4CAF4F] text-[#4CAF4F]"} `}>{goal.done === goal.times ? "Closed" : "Open"}</h1>
                        <div className={type ? `${type.type}-text` : ""}>{type ? capitalizeFirstLetter(type.type.replace("_", " "))+" Goal" : ""}</div>
                        <div className="flex gap-2 text-sm">
                            <div className="grid grid-rows-2 gap-3 text-[#B1B1B1]">
                                <h1>Created At:</h1>
                                <h1>Deadline:</h1>
                            </div>
                            <div className="grid grid-rows-2 gap-3 text-[#4CAF4F]">
                                <h1>{new Date(goal.created_at).toDateString()}</h1>
                                <h1>{new Date(goal.deadline).toDateString()}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 p-5 flex justify-around">
                        <button className="border border-[#4CAF4F] text-[#4CAF4F] hover:bg-[#4CAF4F] hover:text-white rounded-full px-4" onClick={()=>navigate(`/edit_goal/${goal.id}`)}>Edit</button>
                        <button className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-full px-4" onClick={() => setDisplay(true)}>Delete</button>
                    </div>
                </div>

                <div className="flex h-max bg-white">
                    <div className="grid grid-rows-4 grid-cols-2 px-5 pt-5 w-1/3 text-center overflow-hidden">
                        <h1 className="text-slate-400">Title:</h1>
                        <h1 className="text-left">{goal.title}</h1>
                        <h1 className="text-slate-400">Description:</h1>
                        <h1 className="text-left">{goal.description}</h1>
                        <h1 className="text-slate-400">Progress:</h1>
                        <div className="text-left flex flex-col gap-5">
                            <div className="flex justify-around items-center">
                                <span className="w-max">{goal ? goal.done + "/" + goal.times : ""}</span>
                                { goal.done >= goal.times ? (
                                    <div className={`whitespace-nowrap ${type ? type.type+"-text" : ""}`}>
                                        <small>Next Deadline</small>
                                        <h1 className="w-1/2 flex flex-wrap">{nextDeadline(goal)}</h1>
                                    </div>
                                ) : (
                                    <button onClick={() => markDone(goal)} className={`${type ? type.type : ""}-text border rounded-full px-4 ${type ? type.type : ""}-mark-done-button`}>Mark Done</button>
                                    )
                                }
                            </div>
                            <div className="w-full bg-gray-300 rounded-full h-2.5">
                                <div className={`${type ? `${type.type}` : ""} h-2.5 rounded-full animate`} style={{width: `${progress}%`}}></div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between whitespace-nowrap">
                            <h1 className="text-slate-400">
                                All Time:
                                <h1 className={`text-[12px] ${type ? `${type.type}-text` : ""}`}>Success - {goal.successful}</h1>
                                <h1 className={`text-[12px] text-[#b6b6b6]`}>Fail - {goal.unsuccessful}</h1>
                            </h1>
                            <div className="mb-5">
                                <small className="text-slate-900 text-[10px] flex items-center gap-3">
                                    <div className={`rounded-full w-3 h-3 ${type ? `${type.type}` : ""}`}></div>
                                    Success = Reached Target By Deadline
                                </small>
                                <small className="text-slate-900 text-[10px] flex items-center gap-3">
                                    <div className="rounded-full bg-[#d6d6d6] w-3 h-3"></div>
                                    Fail = Failed to Reach Target By Deadline
                                </small>
                            </div>
                        </div>
                        <div className="w-2/3 mx-auto">
                            <CircularProgressbar
                            value={successRate}
                            strokeWidth={50}
                            styles={buildStyles({
                                strokeLinecap: "butt",
                                pathColor: `#${type ? type.color : ""}`
                            })}
                            />
                        </div>
                    </div>

                    <div className="flex flex-1 pt-5">
                        <div className="flex flex-col w-full mx-auto mr-5 border border-[#B1B1B1] rounded">
                            
                            <div className='flex flex-col'>
                                <div className='flex justify-between p-2 items-center text-stone-400 '>
                                    {/* month & year */}
                                    <div>
                                        <span className='font-bold text-black'>
                                        {months[selected.month()]+" "}  
                                        </span>
                                        <span>
                                            {" "+selected.year()}
                                        </span>
                                    </div>
                                
                                    {/* next/prev month & return to current date */}
                                    <div className='flex gap-1 hover:cursor-pointer items-center'>
                                        <div className="w-6 h-6 bg-[#4CAF4F] rounded"></div> = Deadline Date
                                        {/* Today container */}
                                        <div className='flex flex-col items-center ml-5'>
                                            {/* Circle outline & button */}
                                            <div 
                                            className='flex flex-col place-content-center text-xs bg-[#4CAF4F] p-1 rounded-full text-white'
                                            onClick={() => {
                                                setSelected(currentDate)
                                            }}
                                            > 
                                                <h1 className='text-s select-none'>
                                                    Today
                                                </h1>
                                            </div>
                                        </div>

                                        {/* Next/Prev month buttons */}
                                        <div className='flex border my-auto h-max rounded-lg divide-x'>
                                            <div 
                                            className='flex items-center'
                                            onClick={() => {
                                                setSelected(selected.month(selected.month() - 1).endOf('month'))
                                            }}                        
                                            >
                                                <IoIosArrowBack className='w-4 h-4'/>
                                            </div>

                                            <div 
                                            className='flex items-center'
                                            onClick={() => {
                                                setSelected(selected.month(selected.month() + 1).startOf('month'))
                                            }}                        
                                            >
                                                <IoIosArrowForward className='w-4 h-4'/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-rows-6 grid-cols-7 w-full">
                                {dates(selected.month(), selected.year()).map(({date, currentMonth}, index) => {
                                    return(
                                        // tile container
                                        <div
                                        key={index}
                                        className={cn(
                                            // changes text colour for dates outside of the selected month  
                                            currentMonth ? "" : "text-stone-300",
                                            "flex flex-col border-t border-[#B1B1B1] select-none p-2 hover:cursor-pointer min-h-[4rem] max-h-[4rem]",
                                            (index + 1) % 7 === 0 ? "" : "border-r",
                                            matchDeadline(goal, date) ? "bg-[#4CAF4F] text-white" : "hover:bg-slate-100"
                                        )}
                                        onClick={() => {
                                            setSelected(date)
                                        }}
                                        >   
                                            {/* Date and day text container */}
                                            <div className='flex'>
                                                {/* date number container */}
                                                <div
                                                className={cn(
                                                    // applies a round background for selected date
                                                    isSelected(selected.date(), date.date()) && currentMonth ? "rounded-full bg-[#4CAF4F] text-white" : "",
                                                    "flex flex-col place-content-center items-center h-6 w-6 my-1 ml-2"
                                                )}
                                                >
                                                    <h1 className='text-xs'>
                                                        {date.date()}
                                                    </h1>
                                                </div>

                                            {/* day of the week */}
                                                <h1 
                                                className="text-stone-400 text-[8px] mx-2 my-2"
                                                >
                                                    {days[index]}
                                                </h1>

                                            </div>
                                            {/* Completions container */}
                                            <div className='flex flex-wrap overflow-hidden justify-around'>
                                                {// renders a circle marker for each completion per date
                                                    completions ? 
                                                        filterCompletionsByDate(completions, date).map((c, i) => {
                                                            return(
                                                                <div key={i} 
                                                                className={cn(`${c.frequency}`, 'h-2 w-2 rounded-full my-1')}></div> 
                                                            )
                                                        })
                                                    : ""
                                                }
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="border-t border-[#B1B1B1] max-h-[12rem] min-h-[12rem] select-none overflow-y-auto">
                                {
                                    completions ? 
                                        filterCompletionsByDate(completions, selected).map((c, i) => {
                                            return(
                                                <div key={i} className={`w-full py-2 px-16 ${i + 1 === filterCompletionsByDate(completions, selected).length ? "" : "border-b" }`}>
                                                    Updated progress at {new Date(c.created_at).getHours()}:{new Date(c.created_at).getMinutes().toString().length < 2 ? "0" + new Date(c.created_at).getMinutes() : new Date(c.created_at).getMinutes()}:{new Date(c.created_at).getSeconds().toString().length < 2 ? "0" + new Date(c.created_at).getSeconds() : new Date(c.created_at).getSeconds()}
                                                </div> 
                                            )
                                        })
                                    : ""
                                }
                            </div>
                        </div>    
                    </div>
                </div>
            </div>
            </>                
        )
    }

export default GoalShowView