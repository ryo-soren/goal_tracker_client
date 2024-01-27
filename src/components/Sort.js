import { useState } from "react"
import { capitalizeFirstLetter } from "./dashboard/utils/cn"

const Filter = props => {
    const {sortGoalList, currentChange, toSort, setToSort, toggleFilter, expanded, setExpanded}  = props
    const [sortBy, setSortBy] = useState()
    const sortOptions = ["created_date", "deadline", "success_rate", "title", "frequency"]

    const submit = (event) => {
        event.preventDefault()

        sortGoalList(currentChange, sortBy)
        setToSort({...toSort, [currentChange]: sortBy})
        setExpanded({...expanded, [currentChange]: true})
        toggleFilter()
        console.log(toSort);
    }

    return (
        <div className="select-none bg-white w-max flex flex-col p-6 text-[#4CAF4F] place-content-center items-center rounded-xl fixed z-10">
            <div>
                <h1>
                    Select the value to sort the list of goals by
                </h1>
                <form onSubmit={submit}>
                    {
                        sortOptions.map((option, i) => {
                            return(
                                <div key={i} className="flex gap-5 mt-3">
                                    <input type="radio" name="option" value={option} id={option}
                                        className="accent-[#4CAF4F]"
                                        onChange={event=> setSortBy(event.currentTarget.value)}
                                    />
                                    <label htmlFor={option}>{capitalizeFirstLetter(option.replace("_", " "))}</label>
                                </div>
                            )
                        })
                    }
                    <div className="w-3/4 flex justify-between">
                        <button className="border border-[#4CAF4F] px-3 mt-3 rounded-full whitespace-nowrap hover:bg-[#4CAF4F] hover:text-white" onClick={() => {
                            sortGoalList(currentChange, "deadline")
                            setToSort({...toSort, [currentChange]: ""})
                            toggleFilter()
                        }}>Clear Filter</button>
                        <button className="bg-[#4CAF4F] text-white px-3 mt-3 rounded-full">Sort</button>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default Filter