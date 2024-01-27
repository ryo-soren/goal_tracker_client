export default function cn(...classes) {
	return classes.filter(Boolean).join(" ");
}

export const capitalizeFirstLetter = (phrase) => phrase.replace(/(^\w|\s\w)(\S*)/g, (_,m1,m2) => m1.toUpperCase()+m2.toLowerCase())

export const nextDeadline = (goal) => {
	const currentDeadlineDay = new Date(goal.deadline)
	switch (goal.frequency) {
		case "daily":
			currentDeadlineDay.setDate(currentDeadlineDay.getDate() + 1)
			return currentDeadlineDay.toDateString()
		case "monthly":
			currentDeadlineDay.setMonth(currentDeadlineDay.getMonth() + 1)
			return currentDeadlineDay.toDateString()
		case "weekly":
			currentDeadlineDay.setDate(currentDeadlineDay.getDate() + 7)
			return currentDeadlineDay.toDateString()
		case "yearly":
			currentDeadlineDay.setFullYear(currentDeadlineDay.getYear() + 1)
			return currentDeadlineDay.toDateString()
		default:
			break;
	}
}