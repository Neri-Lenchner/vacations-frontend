import React, {JSX,useEffect, useState} from "react";
import {Vacation} from '../../models/vacation.model';
import {vacationStore} from '../../state/vacation-state';
import {followersStore} from "../../state/followers-state";
import {authStore} from "../../state/auth-state";
import {followersService} from '../../services/followers-service';
import {vacationService} from '../../services/vacation-service';
import "./VacationList.css";
import CheckBoxItem from "../CheckBoxItem/CheckBoxItem";
import VacationItem from "../VacationItem/VacationItem";
import Pagination from "../Pagination/Pagination";
import {Follower} from "../../models/follower.model";
import {VacationDestinationIdModel} from "../../models/vacation-destinationId.model";
import {User} from "../../models/user.model";
import ConfirmationWindow from "../ConfirmationWindow/ConfirmationWindow";
import {Unsubscribe} from "redux";


function VacationList(): JSX.Element {

        const [totalVacations, setTotalVacations] = useState<number>(vacationStore.getState().totalVacations);
        const [page, setPage] = useState<Vacation[]>(vacationStore.getState().vacationList);
        const [currentUserFollowedVacations, setCurrentUserFollowedVacations] = useState<Follower[]>(followersStore.getState().currentUserFollowedVacations);
        const [followersCountList, setFollowersCountList] = useState<VacationDestinationIdModel[]>(followersStore.getState().followersCountList);
        const [currentList, setCurrentList] = useState<Vacation[]>([]);
        const [user, setUser] = useState<User | null>(authStore.getState().user);
        const [showFollowed, setShowFollowed] = useState(false);
        const [showUpcoming, setShowUpcoming] = useState(false);
        const [showActive, setShowActive] = useState(false);
        let [isDelete, setIsDelete] = useState(false);
        let [vacationId, setVacationId] = useState<number | undefined>(undefined);


    useEffect(() => {
                void vacationService.fetchData(1);
                void followersService.getFollowersListByUserId(authStore.getState().user!.id!);
                void followersService.getVacationDestinationWithFollowerCount();

                const unSubscribeVacations: Unsubscribe = vacationStore.subscribe((): void => {
                        setTotalVacations(vacationStore.getState().totalVacations);
                        setPage(vacationStore.getState().vacationList);
                });

                const unSubscribeUser: Unsubscribe = authStore.subscribe((): void => {
                    setUser(authStore.getState().user);
                });

                const unSubscribeFollowers: Unsubscribe = followersStore.subscribe((): void => {
                    setCurrentUserFollowedVacations(followersStore.getState().currentUserFollowedVacations);
                    setFollowersCountList(followersStore.getState().followersCountList);
                });

                return (): void => {
                    unSubscribeVacations();
                    unSubscribeUser();
                    unSubscribeFollowers()
                }
        }, []);

    async function handleUpcomingVacations(event: React.ChangeEvent<HTMLInputElement>): Promise<void> {
        const isChecked: boolean = event.target.checked;
        setShowUpcoming(isChecked);
        if (isChecked) {
            setShowFollowed(false);
            setShowActive(false);
        }
        try {
            if (isChecked) {
                const upcomingList: Vacation[] = await vacationService.getUpcomingVacations();
                const sortedList: Vacation[] = upcomingList.sort((a, b): number => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
                setCurrentList(sortedList);
                setPage(sortedList.slice(0, 10));
                setTotalVacations(sortedList.length);
            } else {
                await vacationService.fetchData(1);
                setPage(vacationStore.getState().vacationList);
                setTotalVacations(vacationStore.getState().totalVacations);
            }
        } catch (error) {
            console.error("Error fetching upcoming vacations:", error);
            setShowUpcoming(false);
        }
    }

    async function handleFollowedVacations(event: React.ChangeEvent<HTMLInputElement>): Promise<void> {
        const isChecked: boolean = event.target.checked;
        setShowFollowed(isChecked);
        if (isChecked) {
            setShowUpcoming(false);
            setShowActive(false);
        }
        try {
            if (user?.id && isChecked) {
                const list: Vacation[] = await vacationService.getUsersFollowedVacations(user.id);
                const sortedList: Vacation[] = list.sort((a, b): number => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
                setCurrentList(sortedList);
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

    async function handleActiveVacations(event: React.ChangeEvent<HTMLInputElement>): Promise<void> {
        const isChecked: boolean = event.target.checked;
        setShowActive(isChecked);
        try {
            if (isChecked) {
                setShowFollowed(false);
                setShowUpcoming(false);
                await vacationService.fetchData(1);
                const activeList: Vacation[] = await vacationService.getActiveVacations();
                const sortedList: Vacation[] = activeList.sort((a, b): number => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
                setCurrentList(sortedList);
                setPage(sortedList.slice(0, 10));
                setTotalVacations(sortedList.length);
            } else {
                await vacationService.fetchData(1);
                setPage(vacationStore.getState().vacationList);
                setTotalVacations(vacationStore.getState().totalVacations);
            }
        } catch (error) {
            console.error("Error fetching active vacations:", error);
            setShowActive(false);
        }
    }

    function handlePaginationChange(pageNumber: number): void {
        if (showFollowed || showUpcoming || showActive) {
            const startIndex: number = (pageNumber - 1) * 10;
            const endIndex: number = startIndex + 10;
            setPage(currentList.slice(startIndex, endIndex));
        } else {
            void vacationService.fetchPage(pageNumber);
        }
    }

    return (
        <>
            <div className="Vacation-list-checkbox-container">
                <CheckBoxItem
                    isAdmin={user!.isAdmin}
                    showFunction={showFollowed}
                    handleVacationFunction={handleFollowedVacations}
                    headLine={"Followed Vacations"}
                />
                <CheckBoxItem
                    isAdmin={false}
                    showFunction={showUpcoming}
                    handleVacationFunction={handleUpcomingVacations}
                    headLine={"Didn't start yet"}
                />
                <CheckBoxItem
                    isAdmin={false}
                    showFunction={showActive}
                    handleVacationFunction={handleActiveVacations}
                    headLine={"Active vacations"}
                />
            </div>
            <div className="vacation-list-container">
                {page.map(vacation => (
                    <VacationItem
                        user={user!}
                        vacation={vacation}
                        currentUserFollowedVacations={currentUserFollowedVacations}
                        followersCountList={followersCountList}
                        key={vacation.id}
                        isDelete={isDelete}
                        setIsDelete={setIsDelete}
                        setVacationId={setVacationId}
                    />
                ))}
                {isDelete
                    ? <ConfirmationWindow
                        setIsDelete={setIsDelete}
                        vacationId={vacationId}
                        />
                    : <div></div>}
            </div>
            <Pagination
                totalVacations={totalVacations}
                handlePaginationChange={handlePaginationChange}
            />
        </>
    );
}

export default VacationList;

{/*<label*/}
{/*    className={user?.isAdmin ? "display-none" : "checkbox-label"}*/}
{/*    htmlFor="followed-checkbox">*/}
{/*    <input*/}
{/*        id="followed-checkbox"*/}
{/*        className="checkbox"*/}
{/*        type="checkbox"*/}
{/*        checked={showFollowed}*/}
{/*        onChange={handleFollowedVacations}*/}
{/*    />*/}
{/*    <h4>Followed Vacations</h4>*/}
{/*</label>*/}
{/*<label*/}
{/*    className="checkbox-label"*/}
{/*    htmlFor="upcoming-vacations-checkbox">*/}
{/*    <input*/}
{/*        id="upcoming-vacations-checkbox"*/}
{/*        className="checkbox"*/}
{/*        type="checkbox"*/}
{/*        checked={showUpcoming}*/}
{/*        onChange={handleUpcomingVacations}*/}
{/*    />*/}
{/*    <h4>Didn't start yet</h4>*/}
{/*</label>*/}
{/*<label*/}
{/*    className="checkbox-label"*/}
{/*    htmlFor="active-checkbox">*/}
{/*    <input*/}
{/*        id="active-checkbox"*/}
{/*        className="checkbox"*/}
{/*        type="checkbox"*/}
{/*        checked={showActive}*/}
{/*        onChange={handleActiveVacations}*/}
{/*    />*/}
{/*    <h4>Active vacations</h4>*/}
{/*</label>*/}