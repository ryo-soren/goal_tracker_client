import cn from "./cn";
import { types } from "./dates";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { getSuccessRateByType } from "./percentage";

const SuccessRate = (props) => {
    const {goals} = props
    
    return(
        <div className="flex flex-col border border-[#B1B1B1] rounded-b w-[95%] h-[95%] mx-auto">
            <h1 className="mt-2 font-bold">Success Rate</h1>
            <div className="flex w-full h-full">
                {//create containers for each type
                    types.map((t, i) => {
                        const {type, color} = t
                        const underscoreRemoved = type.replace("_", " ").replace(/(^\w|\s\w)(\S*)/g, match => match.toUpperCase())
                        const percentage = getSuccessRateByType(goals, type)

                        return(
                            <div key={i} className="flex flex-col justify-around w-full h-full">
                                <h1 className={cn(`${type}-text`, "border border-black rounded-full w-[85%] mx-auto font-light")}>{underscoreRemoved}</h1>
                                <div className="w-[70%] flex mx-auto">
                                    <CircularProgressbar
                                    value={percentage}
                                    text={`${percentage}%`}
                                    background
                                    backgroundPadding={6}
                                    styles={buildStyles(
                                            {
                                                backgroundColor: `#${color}`,
                                                textColor: `#fff`,
                                                pathColor: "#fff",
                                                trailColor: `transparent`
                                            }
                                        )
                                    }
                                    />
                                </div>
                            </div>
                        )

                    })
                }
            </div>
        </div>
    )
}

export default SuccessRate