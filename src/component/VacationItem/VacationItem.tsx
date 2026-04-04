import {JSX, useState, useEffect} from 'react';
import "./VacationItem.css";
import {Follower} from '../../models/follower.model';
import {Vacation} from '../../models/vacation.model';
import {User} from '../../models/user.model';
import {followersStore} from '../../state/followers-state';
import {authStore} from '../../state/auth-state';

interface VacationItemProps {
    user: User;
    vacation: Vacation;
    followersList: Follower[];
}

function VacationItem(vacationItemProps: VacationItemProps): JSX.Element {

    const [isFollowing, setIsFollowing] = useState<boolean>(true);
    // const [followersList, setFollowersList] = useState<Follower[]>(followersStore.getState().followersList);
    useEffect(() => {
       // const unsubscribeFollowers = followersStore.subscribe(() => {
       //      setFollowersList(followersStore.getState().followersList);
       //  });

       // const unsubscribeAuthUser = authStore.subscribe(() => {
       //      setUser(authStore.getState().user);
       // });

       // if (user) {
       //     setFollowersList(followersList.filter(follower => follower.userId === user.id));
       // }




       // return () => {
       //     // unsubscribeFollowers();
       //     unsubscribeAuthUser();
       // }

    }, []);

    const {vacation, followersList, user} = vacationItemProps;


    const startDate = vacation.startDate.split('T')[0].split('-').reverse().join('.');
    const endDate = vacation.endDate.split('T')[0].split('-').reverse().join('.');

    return (
        <div className="vacation-item-container">
            <div className="vacation-item-image-container">
                <img className="vacation-item-img" src="https://www.shutterstock.com/image-photo/sun-sets-behind-mountain-ranges-600nw-2479236003.jpg" />
            </div>
            <div className="vacation-item-dates">
                <svg className="vacation-item-svg" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="4" width="18" height="18"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                    <rect x="16" y="16" width="4" height="4"/>
                </svg>
                {startDate} - {endDate}
            </div>
            <div className="vacation-item-content-container">
                <p className="vacation-item-text">
                    {vacation.description}
                </p>
                <button className="form-button vacation-item-button">
                    $ {vacation.cost}
                </button>
            </div>
            <div className="vacation-item-title">
                {vacation.destination}
            </div>
            <div
                className={isFollowing
                    ? "vacation-item-likes-container vacation-item-isFollowing-true"
                    : "vacation-item-likes-container vacation-item-isFollowing-false"}>
                <div className="vacation-item-likes-container-content">
                    {isFollowing ? "❤️" : "🩶" } Likes {followersList.length || 0}
                </div>
            </div>
        </div>
    );
}

export default VacationItem;