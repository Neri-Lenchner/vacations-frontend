import {JSX, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import {Follower} from '../../models/follower.model';
import {Vacation} from '../../models/vacation.model';
import {User} from '../../models/user.model';
import {appConfig} from "../../utils/app-config";
import {followersService} from '../../services/followers-service';
import "./VacationItem.css";

interface VacationItemProps {
    user: User;
    vacation: Vacation;
    followersList: Follower[];
    isDelete: boolean;
    setIsDelete: any;
    setVacationId: any;
}

function VacationItem(vacationItemProps: VacationItemProps): JSX.Element {

    let [isFollowing, setIsFollowing] = useState<boolean>(false);
    const [vacationFollowers, setVacationFollowers] = useState<Follower[]>([]);
    const navigate = useNavigate();
    let {vacation, followersList, user, isDelete, setIsDelete, setVacationId} = vacationItemProps;

    useEffect((): void => {
        if (!followersList.length) {
            setVacationFollowers([]);
            setIsFollowing(false);
            return;
        }

        const followers: Follower[] = followersList.filter(
            follower => follower.vacationId === vacation.id
        );

        setVacationFollowers(followers);

        const isUserFollowing: boolean = followers.some(
            follower => follower.userId === user.id
        );

        setIsFollowing(isUserFollowing);

    }, [followersList, vacation.id, user.id]);

    const startDate: string = vacation.startDate.split('T')[0].split('-').reverse().join('.');
    const endDate: string = vacation.endDate.split('T')[0].split('-').reverse().join('.');

    async function like(): Promise<void> {
        if (isFollowing) {
            const follower: Follower | undefined = vacationFollowers.find(vacationFollower => vacationFollower.userId === user.id);
            if (follower?.id) {
                setIsFollowing(false);
                await followersService.deleteFollower(follower.id);
            }
        } else {
            setIsFollowing(true);
            const follower = new Follower(user.id!, vacation.id!);
            await followersService.addFollower(follower);
        }
    }

    function navigateToAdminForm(): void {
        navigate(`/admin-form/update/${vacation.id}`);
    }

    function deleteVacation(): void {
        isDelete = !isDelete;
        setIsDelete(isDelete);
        setVacationId(vacation.id);
    }

    return (
        <div className="vacation-item-container">
            <div className="vacation-item-image-container">
                <img className="vacation-item-img" src={vacation.imageName
                    ? appConfig.uploadsAddress + vacation.imageName
                    : "/default-pic.jpg"
                } />
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
                <div className="vacation-item-price">
                    $ {Number(vacation.cost).toFixed(0)}
                </div>
            </div>
            <div className="vacation-item-title">
                {vacation.destination}
            </div>
            {user.isAdmin
                ? <div className="vacation-item-admin-clicks">
                    <div
                        className="vacation-item-admin-click-left"
                        onClick={navigateToAdminForm}>
                        &#9998; <div className="vacation-item-admin-click-left-edit">Edit</div>
                    </div>
                    <div className="vacation-item-admin-click-right"
                         onClick={deleteVacation}>
                       <span>&#128465;&#65038;</span> <div className="vacation-item-admin-click-right-delete">Delete</div>
                    </div>
                </div>
                : <div
                    onClick={like}
                    className={isFollowing
                        ? "vacation-item-likes-container vacation-item-isFollowing-true"
                        : "vacation-item-likes-container vacation-item-isFollowing-false"}>
                        <div
                            className="vacation-item-likes-container-content">
                            {isFollowing
                                ? "❤️"
                                : "🩶"
                            } Likes {vacationFollowers.length || 0}
                        </div>
                  </div>
            }
        </div>
    );
}

export default VacationItem;