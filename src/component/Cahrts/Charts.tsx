import { Bar } from 'react-chartjs-2';
import { vacationStore } from '../../state/vacation-state';
import "./Charts.css";
import { useEffect, useState } from "react";
import { Follower } from "../../models/follower.model";
import { Vacation } from "../../models/vacation.model";
import { followersStore } from "../../state/followers-state";
import {vacationService} from "../../services/vacation-service";
import {followersService} from "../../services/followers-service";
import {VacationDestinationIdModel} from "../../models/vacation-destinationId.model";

function Charts() {

    const [followersList, setFollowersList] = useState<Follower[]>(
        followersStore.getState().followersList
    );

    const [followersVacationIdList, setFollowersVacationIdList] = useState<VacationDestinationIdModel[]>(
        followersStore.getState().followersVacationIdList
    );

    // const [vacationList, setVacationList] = useState<Vacation[]>(
    //     vacationStore.getState().vacationList
    // );

    useEffect(() => {

        // void vacationService.getAllVacations();
        void followersService.getFollowersVacationIdList();
        if (!followersStore.getState().followersVacationIdList.length) void followersService.getFollowersVacationIdList();
        if (!followersStore.getState().followersList.length) void followersService.getFollowersList();

        // const unSubscribeVacations = vacationStore.subscribe((): void => {
        //     setVacationList(vacationStore.getState().vacationList);
        // });


        // vacationService.getAllVacations();

        const unSubscribeFollowers = followersStore.subscribe((): void => {
            setFollowersList(followersStore.getState().followersList);
        });

        const unSubscribeFollowersVacationIdList = followersStore.subscribe((): void => {
            setFollowersVacationIdList(followersStore.getState().followersVacationIdList);
        });

        return (): void => {
            unSubscribeFollowers();
            // unSubscribeVacations();
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
                    // labels: vacationList.map(vacation => vacation.destination),
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
                    maintainAspectRatio: false // 👈 THIS is the missing piece
                }}
            />
        </div>
    );
}

export default Charts;