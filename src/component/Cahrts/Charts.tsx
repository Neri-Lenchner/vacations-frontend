import {Chart as ChartsJS, defaults} from 'chart.js/auto';
import {Radar, Line, Bar, Doughnut, Pie} from 'react-chartjs-2';
import {data} from "react-router-dom";
import {vacationStore} from '../../state/vacation-state';
import "./Charts.css";
import {useEffect, useState} from "react";
import {Follower} from "../../models/follower.model";
import {followersStore} from "../../state/followers-state";
import {followersService} from "../../services/followers-service";



function Charts() {
    const [followersList, setFollowersList] = useState<Follower[]>(followersStore.getState().followersList);

    useEffect(() => {
        followersService.getFollowersList();

        const unSubscribeFollowers = followersStore.subscribe((): void => {
            setFollowersList(followersStore.getState().followersList);
        });

        return () => {
            unSubscribeFollowers();
        }
    })
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