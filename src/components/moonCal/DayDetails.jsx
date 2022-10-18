import { useEffect, useState } from "react";

export const DayDetails = (props) => {
    const { open, day, onClose } = props;
    const [dayStyle, setDayStyle] = useState(null);

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

    const firstHorizCross = () => {
        const rise = +day.moon.times.rise.slice(0, 2);
        const set = +day.moon.times.set.slice(0, 2);
        if (rise < set) {
            return <div className="first-horiz-cross">↑ {day.moon.times.rise}</div>;
        } else {
            return <div className="first-horiz-cross">↓ {day.moon.times.set}</div>;
        }
    };

    const secondHorizCross = () => {
        const rise = +day.moon.times.rise.slice(0, 2);
        const set = +day.moon.times.set.slice(0, 2);
        if (rise > set) {
            return <div className="second-horize-cross">{day.moon.times.rise} ↑</div>;
        } else {
            return <div className="second-horize-cross">{day.moon.times.set} ↓</div>;
        }
    };

    const moonHour = () => {
        const rise = +day.moon.times.rise.slice(0, 2);
        const set = +day.moon.times.set.slice(0, 2);
        const sunrise = +day.sun.times.rise.slice(0, 2);
        const sunset = +day.sun.times.set.slice(0, 2);

        let bgc = '';
        let hours = [];
        for (let i = 0; i < 23; i++) {
            if (rise < set) {
                if (rise < i && i < set) bgc = 'white';
                else if (i === rise || i === set) bgc = '#4c4ca8';
                else bgc = 'midnightblue';
            } else {
                if (i < set || rise < i) bgc = 'white';
                else if (i === rise || i === set) bgc = '#4c4ca8';
                else bgc = 'midnightblue';
            }
            // if (i === 12) bgc = 'orange';
            // if (i === sunrise || i === sunset) bgc = 'orange';
            hours.push(<div className="moon-hour" key={i} style={{ backgroundColor: bgc }} />);
        }
        return hours;
    };

    const sunHour = () => {
        const sunrise = +day.sun.times.rise.slice(0, 2);
        const sunset = +day.sun.times.set.slice(0, 2);
        let bgc = '';
        // console.log(day.date,sunrise, set)
        let hours = [];
        for (let i = 0; i < 23; i++) {
            if (sunrise < i && i < sunset) bgc = 'yellow';
            else if (i === sunrise || i === sunset) bgc = 'orange';
            else bgc = 'midnightblue';
            // if (i === sunrise || i === sunset) bgc = 'orange';
            // if (i === 12) bgc = 'orange';
            hours.push(<div className="sun-hour" key={i} style={{ backgroundColor: bgc }} />);
        }
        return hours;
    };



    if (!open) return null;
    // if (!day) return <div>Loading...</div>;
    return (
        <div className="day-details">
            <div className="overlay" onClick={onClose}>
                <div className="modal" onClick={(e) => { e.stopPropagation(); }}>
                    <div><button onClick={onClose}>x</button></div>
                    {/* reuse of preview */}
                    <div className="days-container">
                        <div className="prev-day">

                        </div>
                        <div className="selected-day">

                            <div className="day-data">
                                <div className="date">
                                    <div className="day-name">
                                        {day.dayName}
                                    </div>
                                    <div className="formatted-date">
                                        {day.monthName} {day.dayInMonth}, {day.date.slice(0, 4)}
                                    </div>
                                </div>
                                <div className="illum">
                                    {Math.round(day.moon.illum.fraction * 100)}%
                                </div>
                                <div className="moon-icon" style={moonShadow()} />
                                <div className="times">
                                    {firstHorizCross()}
                                    {secondHorizCross()}
                                </div>
                            </div>
                            <div className="light-bars">
                                <div className="moon-bar" >
                                    {moonHour()}
                                </div>
                                <div className="sun-bar" >
                                    {sunHour()}
                                </div>
                            </div>
                        </div>
                        <div className="next-day">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};