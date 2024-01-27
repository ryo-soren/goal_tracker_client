import Calendar from "./dashboard/utils/Calendar.js";
import SuccessRate from "./dashboard/utils/SuccessRate.js";
import Upcoming from "./dashboard/utils/Upcoming.js";


const Dashboard = (props) => {
    const {goals} = props

    return(
        <div className="grid dashboard-container">
            <div className="grid dashboard">
                <div className="history-container">
                    <Calendar
                    goals = {goals}
                    />
                </div>
                <div className="success-container">
                    <SuccessRate
                    goals = {goals}
                    />
                </div>
            </div>

            <div className="flex flex-col h-full text-center text-[1.5rem] font-bold place-content-center">
                <h1 className=" py-[1rem]">Upcoming</h1>
                <Upcoming
                goals = {goals}
                />
            </div>
        </div>
    )
}

export default Dashboard