import React from 'react';
import { useState, useEffect } from 'react';

const Timer = () => {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const deadline = "December, 31, 2022";

    const getTime = () => {
        const time = Date.parse(deadline) - Date.now();

        setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
        setMinutes(Math.floor((time / 1000 / 60) % 60));
        setSeconds(Math.floor((time / 1000) % 60));
    };

    function formatTime(time){
        if(time < 10){
            return "0" + time
        }
        else{
            return time
        }
    }

    useEffect(() => {
        const interval = setInterval(() => getTime(deadline), 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div id={"Timer"} className={"text_body"}
             style={{
                 textAlign:"center",
                 lineHeight:"40px",
                 position:"relative",
                 fontSize:"20px",
                 height:"40px",
                 width:"160px",
                 borderRadius:"15px"
             }}>
            {formatTime(days)}:{formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
        </div>
    );
};

export default Timer;