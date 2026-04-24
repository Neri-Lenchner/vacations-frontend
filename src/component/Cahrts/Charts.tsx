import { Bar } from 'react-chartjs-2';
import "./Charts.css";
import { useEffect, useState } from "react";
import { Follower } from "../../models/follower.model";
import { followersStore } from "../../state/followers-state";
import {vacationService} from "../../services/vacation-service";
import {VacationDestinationIdModel} from "../../models/vacation-destinationId.model";
import {vacationStore} from "../../state/vacation-state";
import {followersService} from "../../services/followers-service";

function Charts() {

    const [followersList, setFollowersList] = useState<Follower[]>(
        followersStore.getState().followersList
    );

    const [vacationDestinationAndIdList, setVacationDestinationIdList] = useState<VacationDestinationIdModel[]>(
        vacationStore.getState().vacationDestinationAndIdList
    );

    useEffect(() => {

        void vacationService.getVacatioDestenationAndIdList();
        if (!followersStore.getState().followersList.length) void followersService.getFollowersList();

        const unSubscribeFollowers = followersStore.subscribe((): void => {
            setFollowersList(followersStore.getState().followersList);
        });

        const unSubscribeVacationIdList = vacationStore.subscribe((): void => {
            setVacationDestinationIdList(vacationStore.getState().vacationDestinationAndIdList);
        });

        return (): void => {
            unSubscribeFollowers();
            unSubscribeVacationIdList();
        };

    }, []);


    if (!vacationDestinationAndIdList.length) {
        return <div className="Charts-container">Loading...</div>;
    }

    return (
        <div className="Charts-container">
            <Bar
                data={{
                    labels: vacationDestinationAndIdList.map(vacation => vacation.vacationDestination),
                    datasets: [
                        {
                            label: "Followers Map",
                            data: vacationDestinationAndIdList.map(vacation =>
                                followersList.filter(follower => follower.vacationId === vacation.vacationId).length
                            ),
                            backgroundColor: vacationDestinationAndIdList.map((_vacation, i): string => {
                                const hue: number = (i * 360) / vacationDestinationAndIdList.length;
                                return `hsl(${hue}, 65%, 55%)`;
                            }),
                            borderWidth: 1
                        }
                    ]
                }}
                options={{
                    responsive: true,
                    maintainAspectRatio: false
                }}
            />
        </div>
    );
}

export default Charts;