import React, {JSX} from 'react';
import './App.css';
import Header from "./component/layout/header/Header";
import SideBar from "./component/layout/side-bar/SideBar";
import Routing from "./utils/Routing";

function App(): JSX.Element {

    return (
        <div className="App">
            <header>
                <Header/>
            </header>
            <section className="content">
                <aside>
                    <SideBar/>
                </aside>
                <main>
                    <Routing/>
                </main>
            </section>
        </div>
    );
}

export default App;
