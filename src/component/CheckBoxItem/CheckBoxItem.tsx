import React, {JSX, useEffect} from 'react';
import './CheckBoxItem.css';
import {vacationService} from "../../services/vacation-service";
import {followersService} from "../../services/followers-service";
import {authStore} from "../../state/auth-state";
import {Unsubscribe} from "redux";
import {vacationStore} from "../../state/vacation-state";
import {followersStore} from "../../state/followers-state";

interface CheckBoxItemProps {
    isAdmin: boolean;
    showFunction: any;
    handleVacationFunction: any;
    headLine: string;
}

function CheckBoxItem(checkBoxItemProps: CheckBoxItemProps): JSX.Element {

    const {isAdmin, showFunction, handleVacationFunction, headLine} = checkBoxItemProps;

    useEffect(() => {
        // void vacationService.fetchData(1);
        // void followersService.getFollowersListByUserId(authStore.getState().user!.id!);
        // void followersService.getVacationDestinationWithFollowerCount();
        //
        // const unSubscribeVacations: Unsubscribe = vacationStore.subscribe((): void => {
        //     setTotalVacations(vacationStore.getState().totalVacations);
        //     setPage(vacationStore.getState().vacationList);
        // });
        //
        // const unSubscribeUser: Unsubscribe = authStore.subscribe((): void => {
        //     setUser(authStore.getState().user);
        // });
        //
        // const unSubscribeFollowers: Unsubscribe = followersStore.subscribe((): void => {
        //     setCurrentUserFollowedVacations(followersStore.getState().currentUserFollowedVacations);
        //     setFollowersCountList(followersStore.getState().followersCountList);
        // });
        //
        // return (): void => {
        //     unSubscribeVacations();
        //     unSubscribeUser();
        //     unSubscribeFollowers()
        // }
    }, []);

    return (
        <div className="checkbox-item-container">
            <label
                className={isAdmin ? "checkbox-display-none" : "checkbox-label"}
                htmlFor="followed-checkbox">
                <input
                    id="followed-checkbox"
                    className="checkbox"
                    type="checkbox"
                    checked={showFunction}
                    onChange={handleVacationFunction}
                />
                <h4>{headLine}</h4>
            </label>
        </div>
    );
}

export default CheckBoxItem;