export const getSuccessRateByType = (goals, type) => {
    let successful = 0
    let successfulAndUnsuccessful = 0
    goals.filter(g => g.frequency === type).forEach(g => {
        successful += g.successful
        successfulAndUnsuccessful += g.successful + g.unsuccessful
    })
    const percent =  (successful/successfulAndUnsuccessful * 100).toFixed(0)
    return percent === "NaN" ?  0 : percent
}

export const goalProgress = goal => ((goal.done / goal.times) * 100).toFixed(0) === "NaN" ? 0 : (goal.done / goal.times * 100).toFixed(0)
