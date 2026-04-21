import { Bar } from 'react-chartjs-2';
import "./Charts.css";
import { useEffect, useState } from "react";
import { Follower } from "../../models/follower.model";
import { followersStore } from "../../state/followers-state";
import {followersService} from "../../services/followers-service";
import {VacationDestinationIdModel} from "../../models/vacation-destinationId.model";

function Charts() {

    const [followersList, setFollowersList] = useState<Follower[]>(
        followersStore.getState().followersList
    );

    const [followersVacationIdList, setFollowersVacationIdList] = useState<VacationDestinationIdModel[]>(
        followersStore.getState().followersVacationIdList
    );

    useEffect(() => {

        void followersService.getFollowersVacationIdList();
        if (!followersStore.getState().followersVacationIdList.length) void followersService.getFollowersVacationIdList();
        if (!followersStore.getState().followersList.length) void followersService.getFollowersList();

        const unSubscribeFollowers = followersStore.subscribe((): void => {
            setFollowersList(followersStore.getState().followersList);
        });

        const unSubscribeFollowersVacationIdList = followersStore.subscribe((): void => {
            setFollowersVacationIdList(followersStore.getState().followersVacationIdList);
        });

        return (): void => {
            unSubscribeFollowers();
            unSubscribeFollowersVacationIdList();
        };

    }, []);


    if (!followersVacationIdList.length) {
        return <div className="Charts-container">Loading...</div>;
    }

    return (
        <div className="Charts-container">
            <Bar
                data={{
                    labels: followersVacationIdList.map(vacation => vacation.vacationDestination),
                    datasets: [
                        {
                            label: "Followers Map",
                            data: followersVacationIdList.map(vacation =>
                                followersList.filter(follower => follower.vacationId === vacation.vacationId).length
                            ),
                            // backgroundColor: followersVacationIdList.map(() => `hsl(${Math.random() * 360}, 65%, 55%)`),
                            backgroundColor: followersVacationIdList.map((_vacation, i): string => {
                                const hue: number = (i * 360) / followersVacationIdList.length;
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