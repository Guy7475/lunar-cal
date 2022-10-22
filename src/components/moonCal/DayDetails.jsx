import { useEffect, useState } from "react";

export const DayDetails = (props) => {
    const { open, day, onClose } = props;

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
        let fc = 'whitesmoke';
        let borc = 'whitesmoke';
        let hours = [];
        for (let i = 0; i <= 23; i++) {
            if (rise < set) {
                if (rise < i && i < set) {
                    bgc = 'white';
                    fc = 'black';
                    borc = 'black';
                }
                else if (i === rise || i === set) {
                    bgc = '#b2b0ff';
                    fc = 'black';
                    borc = 'black';
                }
                else {
                    bgc = 'midnightblue';
                    fc = 'whitesmoke';
                    borc = 'whitesmoke';
                }
            } else {
                if (i < set || rise < i) {
                    bgc = 'white';
                    fc = 'black';
                    borc = 'black';
                }
                else if (i === rise || i === set) {
                    bgc = '#b2b0ff';
                    fc = 'black';
                    borc = 'black';
                }
                else {
                    bgc = 'midnightblue';
                    fc = 'whitesmoke';
                    borc = 'whitesmoke';
                }
            }
            // if (i === 12) bgc = 'orange';
            // if (i === sunrise || i === sunset) bgc = 'orange';
            let hourStr = `${i}`;
            if (i < 10) hourStr = `0${i}`;
            if (i===13) borc = 'red'
            hours.push(<div className="moon-hour-modal" key={i} style={{ backgroundColor: bgc, color: fc, borderLeft: `1px solid ${borc}` }}>{hourStr}</div>);
        }
        return hours;
    };

    const sunHour = () => {
        const sunrise = +day.sun.times.rise.slice(0, 2);
        const sunset = +day.sun.times.set.slice(0, 2);
        let bgc = '';
        // console.log(day.date,sunrise, set)
        let hours = [];
        for (let i = 0; i <= 23; i++) {
            if (sunrise < i && i < sunset) bgc = 'yellow';
            else if (i === sunrise || i === sunset) bgc = 'orange';
            else bgc = 'midnightblue';
            // if (i === sunrise || i === sunset) bgc = 'orange';
            // if (i === 12) bgc = 'orange';
            hours.push(<div className="sun-hour-modal" key={i} style={{ backgroundColor: bgc }} />);
        }
        return hours;
    };



    if (!open) return null;
    // if (!day) return <div>Loading...</div>;
    return (
        <div className="day-details">
            <div className="overlay" onClick={onClose}>
                <div className="modal" onClick={(e) => { e.stopPropagation(); }}>
                    <div className="close-btn"><button onClick={onClose}>x</button></div>
                    {/* reuse of preview */}
                    <div className="days-container">
                        <div className="prev-day">
                        </div>
                        <div className="selected-day">
                            <div className="day-data-modal">
                                <div className="date-modal">
                                    {day.monthName}-
                                    {day.dayInMonth}
                                </div>
                                <div className="illum-modal">
                                    Illumination: {Math.round(day.moon.illum.fraction * 100)}%
                                </div>
                                {/* <div className="moon-icon-modal" style={moonShadow()} /> */}
                                <div className="times-modal">
                                    {firstHorizCross()}
                                    {secondHorizCross()}
                                </div>
                            </div>
                            <div className="light-bars-modal">
                                <div className="moon-bar-modal" >
                                    {moonHour()}
                                </div>
                                {/* <div className="sun-bar-modal" >
                                    {sunHour()}
                                </div> */}
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