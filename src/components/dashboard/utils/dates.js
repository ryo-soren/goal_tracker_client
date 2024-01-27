import dayjs from "dayjs";

export const datesOfWeek = (startDate = dayjs()) => {
    const endDate = startDate.date(startDate.date() + 6)
    const datesArray = []

    if (startDate.date() < endDate.date()) {
        for (let i = startDate.date(); i <= endDate.date(); i++) {
            datesArray.push(startDate.date(i))
        }    
    } else {
        for (let i = startDate.date(); i <= startDate.endOf('month').date(); i++) {
            datesArray.push(startDate.date(i))            
        }
        for (let i = 1; i <= endDate.date(); i++) {
            datesArray.push(endDate.date(i))            
            
        }
    }

    return datesArray
}

export const matchDeadline = (goal, date) => {
    const dateObjectWithTime = new Date(goal.deadline)
    const year = dateObjectWithTime.getFullYear();
    const month = dateObjectWithTime.getMonth();
    const day = dateObjectWithTime.getDate();

    const dateObjectWithTime2 = new Date(date.toDate())
    const year2 = dateObjectWithTime2.getFullYear();
    const month2 = dateObjectWithTime2.getMonth();
    const day2 = dateObjectWithTime2.getDate();
    return  new Date(year2, month2, day2).toString() === new Date(year, month, day).toString()
}

// fetch goals with upcoming due dates
export const findGoalsByDate = (goals, date) => goals.filter(goal => matchDeadline(goal, date))


// dates in calendar
export const dates = (month = dayjs().month(), year = dayjs().year()) => {
    const startDate = dayjs().year(year).month(month).startOf('month')
    const endDate = dayjs().year(year).month(month).endOf('month')
    const datesArray = []

    // prefix dates
    for (let i = 0; i < startDate.day(); i++) {
        datesArray.push(
            {
                currentMonth: false,
                date: startDate.day(i)
            }
        )
    }

    // current month's dates
    for(let i = startDate.date(); i <= endDate.date(); i++){
        datesArray.push(
            {
                currentMonth: true,
                date: startDate.date(i)
            }
        )

    }
    
    // remaining spaces to fill
    const remainingSpaces = 42 - datesArray.length;

    for (let i = endDate.date() + 1; i <= endDate.date() + remainingSpaces; i++) {
        datesArray.push(
            {
                currentMonth: false,
                date: endDate.date(i),
            }
        )
    }
    return datesArray
}

// generate list of completion
export const getCompletions = (goalsList) =>{
    const completionsList = []
    goalsList.forEach(goal => {
        goal.completions.forEach(completion => {
            completionsList.push(completion)
        });
    })
    return completionsList
}

// matches the date's format and checks if the date of the completion matches the tile's date
const matchCompletionDate = (completion, date) => {
    const dateObjectWithTime = new Date(completion.created_at)
    const year = dateObjectWithTime.getFullYear();
    const month = dateObjectWithTime.getMonth();
    const day = dateObjectWithTime.getDate();

    const dateObjectWithTime2 = new Date(date.toDate())
    const year2 = dateObjectWithTime2.getFullYear();
    const month2 = dateObjectWithTime2.getMonth();
    const day2 = dateObjectWithTime2.getDate();

    return  new Date(year2, month2, day2).toString() === new Date(year, month, day).toString()
}

// filters the completions that match the given date
export const filterCompletionsByDate = (completions, date) => completions.filter(completion => matchCompletionDate(completion, date))

// filters the completions that match the frequency
export const filterCompletionsByType = (comletions, type) => comletions.filter(completion => completion.frequency === type)

// finds the goals that correspond to the given completion
export const findGoalsByCompletions = (completions, goals) => goals.filter(goal => completions.map(completion => completion.goal_id).includes(goal.id))

// checks the selected date matches the date in the array
export const isSelected = (date, dateInArray) => date === dateInArray

export const findTypeByGoal = (goal) => types.filter(type => type.type === goal.frequency)[0]

export const days = [
    "SUN",
    "MON", 
    "TUE", 
    "WED", 
    "THU", 
    "FRI", 
    "SAT"
];

export const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
    "June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export const types = [
    {type: "one_time", color: "ff5e00"},
    {type: "daily", color: "53A5D3"},
    {type: "weekly", color: "FFC83A"},
    {type: "monthly", color: "FF0000"},
    {type: "yearly", color: "7453D3"}
];