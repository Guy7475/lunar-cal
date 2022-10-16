// import { isToday } from "date-fns";
// import { moonCalcService } from "../../services/moonCalService";
import { useEffect, useRef, useState } from "react";


export const DayPreview = (props) => {

    const { day } = props;
    const [dayStyle, setDayStyle] = useState(null);
    const divRef = useRef(null);

    useEffect(() => {
        isToday();
        loadDayPreview();
        return () => {

        };
    }, []);

    const isToday = () => {
        // console.log(day)
        const todayDate = new Date().toISOString().slice(0, 10);
        if (day.date === todayDate) {
            return true;
        }
    };

    const loadDayPreview = () => {
        const dayStyle = {};
        if (day.monthNum % 2) {
            dayStyle.color = 'white';
            dayStyle.backgroundColor = '#333333';
        } else {
            dayStyle.color = 'white';
            dayStyle.backgroundColor = '#5a5a5a';
        }
        if (isToday()) {
            dayStyle.backgroundColor = 'navy';
            dayStyle.border = '1px solid white';
        }
        setDayStyle(dayStyle);
    };

    const moonShadow = () => {
        const phase = day.moon.illum.phase;
        let cover;
        const factor = 3;

        if (phase <= 0.5) cover = phase * factor;
        else cover = -(1 - phase) * factor;

        return { boxShadow: `inset ${cover}em 0 1px white, 0 0 3px #444` };
    };

    const lightBar = () => {
        // console.log(day.sun.times)
    };

    const setFocus = () => {
        if (isToday()) {
            return (
                <div tabIndex="0" id="todayDiv" ></div>
            );
        }
        // divRef.current.focus();
    };

    if (!day) return <div>Loading...</div>;
    return (
        <div className="day-preview" style={dayStyle} ref={divRef}>
            <div className="date">
                {day.monthName}-
                {day.dayInMonth}
            </div>
            <div className="illum">
                {Math.round(day.moon.illum.fraction * 100)}%
            </div>
            <div className="moon-icon" style={moonShadow()} />
            <div className="times">
                <div>
                🡅 {day.moon.times.rise}
                </div>
                <div>
                🡇 {day.moon.times.set}
                </div>
            </div>
            <div className="light-bars">
                {/* <div className="sunlight" style={lightBar()}/> */}
            </div>
            {setFocus()}
        </div>
    );
};
