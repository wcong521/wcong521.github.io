import Home from './Home';
import Carousel from './Carousel';
import Slideshow from './Slideshow';
import React, { useState, useEffect } from "react";

function App() {

    const [screen, setScreen] = useState({ component: 'home' });

    useEffect(() => {
        localStorage.setItem("screen", JSON.stringify(screen))

    }, [screen])

    function renderScreen() {

        if (screen.component === 'home') {

            return <Home setScreen={setScreen} />;

        } else if (screen.component === 'carousel') {

            return <Carousel setScreen={setScreen} type={screen.type} />;

        } else if (screen.component === 'slideshow') {

            return <Slideshow setScreen={setScreen} type={screen.type} initial={screen.initial} />;

        }
    }

    return (
        <div className="App">
            {renderScreen()}
        </div>
    );
}

export default App;
