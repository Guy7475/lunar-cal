import { storageService } from "../../services/async-storage-service";
import { cal2022 } from "../../data/2022_cal";
import { cal2023 } from "../../data/2023_cal";
import { moonCalcService } from '../../services/moonCalService';
import { useState, useEffect } from 'react';
import { DayPreview } from './DayPreview';

export const MoonCal = () => {
    const cal22 = cal2022
    const cal23 = cal2023

    useEffect(() => {
        return () => {

        };
    }, []);

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

    if (!cal22 || !cal23 ) return <div>Loading...</div>;
    return (
        < section className='moon-cal' >
            <div className="weekdays">
                <div className='day-title'>Sun</div>
                <div className='day-title'>Mon</div>
                <div className='day-title'>Tue</div>
                <div className='day-title'>Wed</div>
                <div className='day-title'>Thu</div>
                <div className='day-title'>Fri</div>
                <div className='day-title'>Sat</div>
            </div>
            <div className='cal-body'>
                {padding()}
                {cal22.map(month => {
                    return month.days.map((day, index) => <DayPreview key={index} day={day} year={2022}/>);
                })}
                {cal23.map(month => {
                    return month.days.map((day, index) => <DayPreview key={index} day={day} year={2023}/>);
                })}
            </div>
            {focusOnToday()}
        </section >
    );
};