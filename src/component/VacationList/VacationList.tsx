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
        const [user, setUser] = useState<User | null>(authStore.getState().user);

        useEffect(() => {
                vacationService.fetchData(1);

                followersService.getFollowersList();

                const unSubscribeVacations = vacationStore.subscribe(() => {
                        setTotalVacations(vacationStore.getState().totalVacations);
                        setPage(vacationStore.getState().vacationList);
                });

                const unSubscribeUser = authStore.subscribe(() => {
                    setUser(authStore.getState().user);
                });

                const unSubscribeFollowers = followersStore.subscribe(() => {
                    setFollowersList(followersStore.getState().followersList);
                });

                return () => {
                    unSubscribeVacations();
                    unSubscribeUser();
                    unSubscribeFollowers()
                }
        }, []);

    return (
        <>
            <div className="Vacation-list-checkbox-container">
                {/*<input type="checkbox" />*/}
                {/*<input type="checkbox" />*/}
                {/*<input type="checkbox" />*/}
                <label className="checkbox-label">
                    <input type="checkbox"/>
                    <h4>Followed Vacations</h4>
                </label>
                <label className="checkbox-label">
                    <input type="checkbox"/>
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
            <Pagination totalVacations={totalVacations} />
        </>
    );
}

export default VacationList;