import { Bar } from 'react-chartjs-2';
import "./Charts.css";
import { useEffect, useState } from "react";
import { Follower } from "../../models/follower.model";
import { followersStore } from "../../state/followers-state";
import {followersService} from "../../services/followers-service";
import {VacationDestinationIdModel} from "../../models/vacation-destinationId.model";
import {vacationStore} from "../../state/vacation-state";

function Charts() {

    const [followersList, setFollowersList] = useState<Follower[]>(
        followersStore.getState().followersList
    );

    const [vacationDestinationIdList, setVacationDestinationIdList] = useState<VacationDestinationIdModel[]>(
        vacationStore.getState().vacationDestinationIdList
    );

    useEffect(() => {

        if (!vacationStore.getState().vacationDestinationIdList.length) void followersService.getFollowersVacationIdList();
        if (!followersStore.getState().followersList.length) void followersService.getFollowersList();

        const unSubscribeFollowers = followersStore.subscribe((): void => {
            setFollowersList(followersStore.getState().followersList);
        });

        const unSubscribeFollowersVacationIdList = vacationStore.subscribe((): void => {
            setVacationDestinationIdList(vacationStore.getState().vacationDestinationIdList);
        });

        return (): void => {
            unSubscribeFollowers();
            unSubscribeFollowersVacationIdList();
        };

    }, []);


    if (!vacationDestinationIdList.length) {
        return <div className="Charts-container">Loading...</div>;
    }

    return (
        <div className="Charts-container">
            <Bar
                data={{
                    labels: vacationDestinationIdList.map(vacation => vacation.vacationDestination),
                    datasets: [
                        {
                            label: "Followers Map",
                            data: vacationDestinationIdList.map(vacation =>
                                followersList.filter(follower => follower.vacationId === vacation.vacationId).length
                            ),
                            // backgroundColor: vacationDestinationIdList.map(() => `hsl(${Math.random() * 360}, 65%, 55%)`),
                            backgroundColor: vacationDestinationIdList.map((_vacation, i): string => {
                                const hue: number = (i * 360) / vacationDestinationIdList.length;
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