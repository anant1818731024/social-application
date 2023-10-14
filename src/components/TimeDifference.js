import { useEffect, useState } from "react";

const TimeDifference = ({time}) => {
    const [timeString, setTimeString] = useState("");
    const date = new Date(time);
    useEffect(() => {
        if(date){
            const interval = setInterval(() => {
                const timeDifference = Date.now() - date
                let seconds = Math.floor(timeDifference/1000);
                let minutes = Math.floor(seconds/60);
                seconds = seconds%60;
                let hours = Math.floor(minutes/60);
                minutes = minutes%60;
                if(hours > 24){
                    setTimeString(date.toDateString());
                    return;
                }
                if(hours <= 0){
                    setTimeString(minutes > 0 ? `${minutes} minutes ago`: "few seconds ago")
                }else{
                    setTimeString(`${hours} hours ${minutes} minutes ago`)
                }
            },[1000])
    
            return () => {
                clearInterval(interval)
            }
        }
    },[date])

    return (
        <>
            {timeString}
        </>
    )
}

export default TimeDifference;