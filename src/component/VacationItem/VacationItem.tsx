import {JSX, useState, useEffect} from 'react';
import "./VacationItem.css";
import {Follower} from '../../models/follower.model';
import {Vacation} from '../../models/vacation.model';
import {User} from '../../models/user.model';
import {followersStore} from '../../state/followers-state';
import {followersService} from '../../services/followers-service';
import {authStore} from '../../state/auth-state';

interface VacationItemProps {
    user: User;
    vacation: Vacation;
    followersList: Follower[];
}

function VacationItem(vacationItemProps: VacationItemProps): JSX.Element {

    let [isFollowing, setIsFollowing] = useState<boolean>(true);
    const [vacationFollowers, setVacationFollowers] = useState<Follower[]>([]);

    const {vacation, followersList, user} = vacationItemProps;

    useEffect(() => {
        if (followersList.length) {
            const followers: Follower[] = followersList.filter(follower => follower.vacationId === vacation.id);
            setVacationFollowers(followers);
        }
    }, [followersList, vacation.id]);

    useEffect(() => {
        const follower = vacationFollowers.find(follower => follower.userId === user.id);
        setIsFollowing(!!follower);
    }, [vacationFollowers, user.id]);

    const startDate: string = vacation.startDate.split('T')[0].split('-').reverse().join('.');
    const endDate: string = vacation.endDate.split('T')[0].split('-').reverse().join('.');

    async function like() {
        if (isFollowing) {
            // Currently following, so unfollow
            const follower = vacationFollowers.find(f => f.userId === user.id);
            if (follower?.id) {
                setIsFollowing(false);
                await followersService.deleteFollower(follower.id);
            }
        } else {
            // Not following, so follow
            setIsFollowing(true);
            const follower = new Follower(user.id!, vacation.id!);
            await followersService.addFollower(follower);
        }
    }

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
                onClick={like}
                className={isFollowing
                    ? "vacation-item-likes-container vacation-item-isFollowing-true"
                    : "vacation-item-likes-container vacation-item-isFollowing-false"}>
                <div
                    className="vacation-item-likes-container-content">
                    {isFollowing ? "❤️" : "🩶" } Likes {vacationFollowers.length || 0}
                </div>
            </div>
        </div>
    );
}

export default VacationItem;