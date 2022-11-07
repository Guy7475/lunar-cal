import { useState } from "react";

export const AppHeader = (props) => {

    const [selectedDate, setSelectedDate ] = useState(null)
    
    const jumpToToday = () => {
        const todayDate = new Date().toISOString().slice(0, 10);
        document.getElementById(`${todayDate}`).scrollIntoView({block: 'center' })
    };

    const jumpToDate = (e) => {
        setSelectedDate(e.target.value)
        console.log(selectedDate)
        const elDay = document.getElementById(`${selectedDate}`)
        // elDay.style.backgroundColor = 'dark-green'
        // elDay.style.border = '1px solid white';
        // elDay.scrollIntoView({block: 'center' })
    }

    return (
        <header className="app-header">
            {/* Astro Check */}
            {/* <span className="jump-today" onClick={() => props.jumpToToday()}> */}
            <span className="jump-today" onClick={() => jumpToToday()}>
                Today ➤
            </span>
            {/* <input type="date" onChange={(e) => jumpToDate(e)}/> */}
        </header>
    );
}

