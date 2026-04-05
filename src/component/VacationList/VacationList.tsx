import {JSX,useEffect, useState} from "react";
import redux from 'redux';
import {Vacation} from '../../models/vacation.model';
import {vacationStore} from '../../state/vacation-state';
import {followersStore} from "../../state/followers-state";
import {authStore} from "../../state/auth-state";
import {followersService} from '../../services/followers-service';
import {vacationService} from '../../services/vacation-service';
import "./VacationList.css";
import VacationItem from "../VacationItem/VacationItem";
import Pagination from "../Pagination/Pagination";
import {Follower} from "../../models/follower.model";
import {User} from "../../models/user.model";



function VacationList(): JSX.Element {

        const [totalVacations, setTotalVacations] = useState<number>(vacationStore.getState().totalVacations);
        const [page, setPage] = useState<Vacation[]>(vacationStore.getState().vacationList);
        const [followersList, setFollowersList] = useState<Follower[]>(followersStore.getState().followersList);
        const [followedList, setFollowedList] = useState<Vacation[]>([]);
        const [user, setUser] = useState<User | null>(authStore.getState().user);
        const [showFollowed, setShowFollowed] = useState(false);


    useEffect(() => {
                vacationService.fetchData(1);

                followersService.getFollowersList();

                const unSubscribeVacations = vacationStore.subscribe((): void => {
                        setTotalVacations(vacationStore.getState().totalVacations);
                        setPage(vacationStore.getState().vacationList);
                });

                const unSubscribeUser = authStore.subscribe((): void => {
                    setUser(authStore.getState().user);
                });

                const unSubscribeFollowers = followersStore.subscribe((): void => {
                    setFollowersList(followersStore.getState().followersList);
                });

                return (): void => {
                    unSubscribeVacations();
                    unSubscribeUser();
                    unSubscribeFollowers()
                }
        }, []);



    async function handleFollowedVacations(event: React.ChangeEvent<HTMLInputElement>): Promise<void> {
        const isChecked: boolean = event.target.checked;
        setShowFollowed(isChecked);

        try {
            if (user?.id && isChecked) {
                const list: Vacation[] = await vacationService.getUsersFollowedVacations(user.id);
                const sortedList: Vacation[] = list.sort((a, b): number => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
                setFollowedList(sortedList);
                setPage(sortedList.slice(0, 10));
                setTotalVacations(list.length);

            } else {
                await vacationService.fetchData(1);
                setPage(vacationStore.getState().vacationList);
                setTotalVacations(vacationStore.getState().totalVacations);
            }
        } catch (error) {
            console.error("Error fetching followed vacations:", error);
            setShowFollowed(false);
        }
    }

    function handlePaginationChange(pageNumber: number): void {
        if (showFollowed) {
            const startIndex: number = (pageNumber - 1) * 10;
            const endIndex: number = startIndex + 10;
            setPage(followedList.slice(startIndex, endIndex));
        } else {
            vacationService.fetchPage(pageNumber);
        }
    }

    return (
        <>
            <div className="Vacation-list-checkbox-container">
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={showFollowed}
                        onChange={handleFollowedVacations}
                    />
                    <h4>Followed Vacations</h4>
                </label>
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                    />
                    <h4>Didn't start yet</h4>
                </label>
                <label className="checkbox-label">
                    <input type="checkbox"/>
                    <h4>Active vacations</h4>
                </label>
            </div>
            <div className="vacation-list-container">
                {page.map(vacation => (
                    <VacationItem
                        user={user!}
                        vacation={vacation}
                        followersList={followersList}
                        key={vacation.id}
                    />
                ))}
            </div>
            <Pagination totalVacations={totalVacations} onPageChange={handlePaginationChange} />
            {/*{!showFollowed*/}
            {/*    ? <Pagination totalVacations={totalVacations} />*/}
            {/*    : <></>}*/}
        </>
    );
}

export default VacationList;