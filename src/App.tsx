import React, {JSX} from 'react';
import './App.css';
import Header from "./component/header/Header";
import Routing from "./utils/Routing";

function App(): JSX.Element {

    return (
        <div className="App">
            <header>
                <Header/>
            </header>
            <main>
                <Routing/>
            </main>
        </div>
    );
}

export default App;
