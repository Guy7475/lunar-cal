import { storageService } from "../../services/async-storage-service";
import { cal2022 } from "../../data/2022_cal";
import { moonCalcService } from '../../services/moonCalService';
import { useState, useEffect } from 'react';
import { DayPreview } from './DayPreview';

export const MoonCal = () => {

    const [cal, setCal] = useState(null);

    useEffect(() => {
        loadCalendar();
        return () => {

        };
    }, []);


    const loadCalendar = async () => {
        // const cal = await storageService.query('moon_db')
        // const cal = moonCalcService.dateFnsCal(2022);
        const cal = cal2022;
        // console.log(cal[11].days[30].moon.times.rise);
        setCal(cal);
    };

    const padding = () => {
        let pad = [
            <div key="1"></div>,
            <div key="2"></div>,
            <div key="3"></div>,
            <div key="4"></div>,
            <div key="5"></div>,
            <div key="6"></div>,
        ];
        return pad;
    };

    const focusOnToday = () => {
        //TODO - remove the timeout and set autofocus
        setTimeout(() => {
            const todayDate = new Date().toISOString().slice(0, 10);
            document.getElementById(`${todayDate}`).scrollIntoView({ block: 'center' });
        }, 300);
    };

    if (!cal) return <div>Loading...</div>;
    return (
        < section className='moon-cal' >
            <div className="weekdays">
                <div className='day-title'>Su</div>
                <div className='day-title'>Mo</div>
                <div className='day-title'>Tu</div>
                <div className='day-title'>We</div>
                <div className='day-title'>Th</div>
                <div className='day-title'>Fr</div>
                <div className='day-title'>Sa</div>
            </div>
            <div className='cal-body'>
                {padding()}
                {cal.map(month => {
                    return month.days.map((day, index) => <DayPreview key={index} day={day} />);
                })}
            </div>
            {focusOnToday()}
        </section >
    );
};