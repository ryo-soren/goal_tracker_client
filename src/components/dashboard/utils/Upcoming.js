import { useState } from "react";
import "../stylesheets/upcomingStyles.css"
import { datesOfWeek, findGoalsByDate, days, months, types } from "./dates"
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import dayjs from "dayjs"
import cn, { capitalizeFirstLetter } from "./cn";
import { Link } from "react-router-dom";

const Upcoming = props => {
    const {goals} = props
    const currentDate = dayjs()
    const [selected, setSelected] = useState(currentDate)

    return(
        <div className="upcoming bg-white w-[95%] h-max border border-[#b1b1b1] rounded mx-auto mb-[.7rem]">
            <div className="flex w-full items-center text-sm">
                <div className=" text-stone-400 flex items-center justify-around w-[50%] mx-4">
                    <div className="text-[8px] mr-4 select-none">
                        Week of {`${capitalizeFirstLetter(days[selected.day()])} ${months[selected.month()].slice(0, 3)} ${selected.date()}`}
                    </div>
                    <div className='hover:cursor-pointer flex border w-min h-max rounded-lg divide-x'>
                            <div 
                            className='flex items-center'
                            onClick={() => {
                                setSelected(selected.date(selected.date() - 7))
                            }}                        
                            >
                                <IoIosArrowBack className='w-4 h-4'/>
                            </div>
                            <div
                            className="px-1 select-none"
                            onClick={() => {
                                setSelected(currentDate)
                            }}
                            >
                                Today
                            </div>
                            <div 
                            className='flex items-center'
                            onClick={() => {
                                setSelected(selected.date(selected.date() + 7))                                
                            }}                        
                            >
                                <IoIosArrowForward className='w-4 h-4'/>
                            </div>
                        </div>
                </div>
                <div className="flex justify-center flex-wrap w-[50%]">
                    {types.map(({type}, i) => {
                        return(
                            <div key={i} className="flex items-center text-[8px] mr-2">
                                <div className={cn("rounded-full h-3 w-3 mr-2", `${type}`)}></div>
                                <h1>{capitalizeFirstLetter(type.replace("_", " "))}</h1>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="border-t border-[#b1b1b1] grid grid-flow-row auto-rows-[4.5rem]">
                {
                    datesOfWeek(selected).map((day, i) => {
                        return(
                            <div key={i} className="flex text-left">
                                <div className="flex w-1/5 border-r border-[#b1b1b1] place-content-center items-center text-xs font-medium">
                                    <h1>{`${capitalizeFirstLetter(days[day.day()])} ${months[day.month()].slice(0, 3)} ${day.date()}`}</h1>
                                </div>
                                <div className={cn("flex flex-wrap w-4/5 border-[#b1b1b1] place-content-center items-center", i === 0 ? "": "border-t")}>
                                    {findGoalsByDate(goals, day).map(({title, frequency, done, times, id}, i) => {
                                        return(
                                            (done/times*100).toFixed(0) < 100 ? (
                                                <div key={i} 
                                                className="hover:cursor-pointer flex flex-wrap text-[8px] mx-2 my-2"
                                                >
                                                    <Link to={`/goals/${id}`}
                                                    className="flex flex-wrap"
                                                    >
                                                        <div className={cn("rounded-full h-3 w-3 mr-2", `${frequency}`)}></div>
                                                        <div className="overflow-hidden whitespace-nowrap max-w-[4rem]">{title}</div>
                                                        <div className="mx-1">-</div>
                                                        <div>{(done/times*100).toFixed(0)}% Done</div>
                                                    </Link>
                                                </div>
                                            ) : ("")
                                        )
                                    })}
                                </div>                                
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Upcoming