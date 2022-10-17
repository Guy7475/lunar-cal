
export const AppHeader = (props) => {

    const jumpToToday = () => {
        const todayDate = new Date().toISOString().slice(0, 10);
        document.getElementById(`${todayDate}`).scrollIntoView({block: 'center' })
    };

    return (
        <header className="app-header">
            {/* Astro Check */}
            {/* <span className="jump-today" onClick={() => props.jumpToToday()}> */}
            <span className="jump-today" onClick={() => jumpToToday()}>
                Today ➤
            </span>
        </header>
    );
}

