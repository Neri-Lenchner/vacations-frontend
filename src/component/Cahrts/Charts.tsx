import {Chart as ChartsJS, Color, defaults} from 'chart.js/auto';
import {Radar, Line, Bar, Doughnut, Pie} from 'react-chartjs-2';
import {data} from "react-router-dom";
import {vacationStore} from '../../state/vacation-state';
import "./Charts.css";
import {useEffect, useState} from "react";
import {Follower} from "../../models/follower.model";
import {Vacation} from "../../models/vacation.model";
import {followersStore} from "../../state/followers-state";
import {followersService} from "../../services/followers-service";



function Charts() {
    const [followersList, setFollowersList] = useState<Follower[]>(followersStore.getState().followersList);
    const [vacationList, setVacationList] = useState<Vacation[]>([]);
    const [colors, setColors] = useState<Color[]>([]);

    useEffect(() => {
        const unSubscribeVacations = vacationStore.subscribe(() => {
            setVacationList(vacationStore.getState().vacationList)
        })
        followersService.getFollowersList();

        const unSubscribeFollowers = followersStore.subscribe((): void => {
            setFollowersList(followersStore.getState().followersList);
        });

        return () => {
            unSubscribeFollowers();
            unSubscribeVacations();
        }
    });


    return (
        <div className="Charts-container">
           {/*<Bar*/}
           {/*     data={{*/}
           {/*         labels: vacationStore.getState().vacationList.map(vacation => vacation.destination),*/}
           {/*         datasets: [*/}
           {/*             {*/}
           {/*                 label: "Vacations destinations",*/}
           {/*                 data: vacationStore.getState().vacationList.map(vacation => {*/}
           {/*                     followersStore.getState().followersList.map(follower => follower.vacationId === vacation.id);*/}
           {/*                     }*/}
           {/*                 )*/}
           {/*             }*/}
           {/*         ]*/}
           {/*     }}*/}
           {/*/>*/}

            <Bar
                data={{
                    labels: vacationStore.getState().vacationList.map(v => v.destination),
                    datasets: [
                        {
                            label: "Followers per vacation",
                            data: vacationStore.getState().vacationList.map(vacation =>
                                followersList.filter(f => f.vacationId === vacation.id).length
                            )
                        }
                    ]
                }}
            />
        </div>
    );
}

export default Charts;