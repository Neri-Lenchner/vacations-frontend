import {Chart as ChartsJS, defaults} from 'chart.js/auto';
import {Radar, Line, Bar, Doughnut, Pie} from 'react-chartjs-2';
import {data} from "react-router-dom";
import {vacationStore} from '../../state/vacation-state';
import "./Charts.css";



function Charts() {
    return (
        <div className="Charts-container">
           {/*<Bar*/}
           {/*     data={{*/}
           {/*         labels: vacationStore.getState().vacationList.map(vacation => vacation.destination),*/}
           {/*         datasets: [*/}
           {/*             {*/}
           {/*                 label: "Vacations",*/}
           {/*                 data: vacationStore.getState().vacationList.map(vacation => vacation.destination)*/}
           {/*             }*/}
           {/*         ]*/}
           {/*     }}*/}
           {/*/>*/}
        </div>
    );
}

export default Charts;