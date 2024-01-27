import '../stylesheets/calendarStyles.css'
import cn from "./cn";
import { getCompletions, filterCompletionsByDate, filterCompletionsByType, findGoalsByCompletions, isSelected, dates, days, months, types } from "./dates";
import { useState } from "react";
import dayjs from "dayjs";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";


const Calendar = (props) => {
    const currentDate = dayjs()
    const [selected, setSelected] = useState(currentDate)
    const {goals} = props
    const completions = getCompletions(goals)

    return(
        <div className='calendar-container bg-white rounded-t border-t border-x border-[#B1B1B1] overflow-hidden h-full'>
            <div className='calendar-view flex flex-col'>
                <div className='flex justify-between p-2 items-center text-stone-400 border-r border-[#B1B1B1]'>
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
                    <div className='flex gap-1 hover:cursor-pointer'>

                        {/* Today container */}
                        <div className='flex flex-col items-center'>
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
            
                <div className='calendar-grid grid-rows-6 hover:cursor-pointer'>
                    {/* generate dates based on the month */}
                    {dates(selected.month(), selected.year()).map(({date, currentMonth}, index) => {
                        return(
                            // tile container
                            <div
                            key={index}
                            className={cn(
                                // changes text colour for dates outside of the selected month  
                                currentMonth ? "" : "text-stone-300",
                                "flex flex-col border-t border-r border-[#B1B1B1] select-none hover:bg-slate-100" 
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
                                        "flex flex-col place-content-center h-6 w-6 mt-1 ml-2"
                                    )}
                                    >
                                        <h1 className='text-xs'>
                                            {date.date()}
                                        </h1>
                                    </div>

                                {/* day of the week */}
                                    <h1 
                                    className="text-stone-400 text-[8px] mx-auto mt-2"
                                    >
                                        {days[index]}
                                    </h1>

                                </div>
                                {/* Completions container */}
                                <div className='flex flex-wrap overflow-hidden'>
                                    {// renders a circle marker for each completion per date
                                        filterCompletionsByDate(completions, date).map((c, i) => {
                                            return(
                                                <div key={i} 
                                                className={cn(`${c.frequency}`, 'h-2 w-2 rounded-full mx-auto mt-1')}></div> 
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='goals-view'>
                {/* selected date */}
                <h1 className='bg-[#4CAF4F] text-white text-s flex place-content-center items-center select-none'>
                    {selected.date()+"/"+(selected.month() + 1)+"/"+selected.year()}
                </h1>

                {/* Container for rows of completion type */}
                <div className='grid grid-rows-5'>
                    {//creating a grid element for each type of frequency
                        types.map((t, i) => {
                            const {type} = t
                            const underscoreRemoved = (type.replace("_", " ")).replace(/(^\w|\s\w)(\S*)/g, match => match.toUpperCase())
                            const filteredByType = filterCompletionsByType(filterCompletionsByDate(completions, selected), type)
                            const goalsByType = findGoalsByCompletions(filteredByType, goals)
                            return(
                                // row of completion type
                                <div key={i} className='flex border-t border-[#B1B1B1]'>
                                        {/* left side */}
                                        <div className='w-1/3 flex flex-col items-center border-r border-[#b1b1b1]'>
                                            <h1 className={cn(`${type}-text`, `w-max h-min text-[8px] font-semibold border rounded-lg px-2 mt-2`)}>
                                                {underscoreRemoved}
                                            </h1>
                                            <div className='flex flex-col h-full text-[.6rem] text-black place-content-center items-center mx-auto font-semibold'>
                                                <h1>
                                                    {goalsByType.length + (goalsByType.length === 1 ? " goal" : " goals")}
                                                </h1>
                                                <h1> Completed</h1>
                                            </div>
                                        </div>
                                        {/* Goals */}
                                        <div className='w-2/3 max-h-20 overflow-y-auto flex flex-col'>
                                            {goalsByType.map((g, i) => {
                                                return(
                                                    <div 
                                                    key={i}
                                                    className='text-[10px] text-left font-light border-b whitespace-nowrap w-full mt-1 pl-1'
                                                    >
                                                        {g.title}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Calendar;