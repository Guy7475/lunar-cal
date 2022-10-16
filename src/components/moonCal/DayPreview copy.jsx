import { useEffect, useRef, useState } from "react";


export const DayPreview = (props) => {

    const { day } = props;
    const [dayStyle, setDayStyle] = useState(null);
    const divRef = useRef(null);

    useEffect(() => {
        loadDayPreview();
        focusOnToday();
        return () => {

        };
    }, []);

    const loadDayPreview = () => {
        const dayStyle = {

        };
        if (day.monthNum % 2) {
            dayStyle.color = 'white';
            dayStyle.backgroundColor = '#252525';
        } else {
            dayStyle.color = 'white';
            dayStyle.backgroundColor = '#5a5a5a';
        }
        setDayStyle(dayStyle);
    };

    const focusOnToday = () => {
        console.log(day)
        const todayDate = new Date().toISOString().slice(0, 10);
        if (day.dateHTML === todayDate) {
            // console.log(day.monthName, day.dayInMonth)
            divRef.current.focus();
        }
    };


    if (!day) return <div>Loading...</div>;
    return (
        <div className="day-preview" style={dayStyle} ref={divRef}>
            {day.monthName}
            {day.dayInMonth}
        </div>
    );
};
