import React, {JSX, useEffect, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {Unsubscribe} from 'redux';
import {AuthActionType, authStore} from '../../state/auth-state';
import './Header.css';
import {User} from '../../models/user.model';
import { AiFillHome } from "react-icons/ai";
import { RiLogoutBoxFill } from "react-icons/ri";
import { RiLoginBoxFill } from "react-icons/ri";
import { FaFileCsv } from "react-icons/fa"
import { IoBarChartSharp } from "react-icons/io5";
import { MdNoteAdd } from "react-icons/md";
// import { LiaThListSolid } from "react-icons/lia";
import { LuLayoutList } from "react-icons/lu";


function Header(): JSX.Element {
    const navigate = useNavigate();
    const [userName, setUserName] = useState<string | undefined>(
        authStore.getState().token
            ? (`${authStore.getState().user?.firstName!} ${authStore.getState().user?.lastName}`)
            : undefined
    );

    const [user, setUser] = useState<User | null>(authStore.getState().user);

    useEffect((): Unsubscribe => {
        const unsubscribe: Unsubscribe = authStore.subscribe((): void => {
            const currentUser: User | null = authStore.getState().user;
            if (currentUser !== null) {
                console.log(currentUser?.firstName);
                setUserName(`${currentUser?.firstName!} ${currentUser?.lastName}`);
                setUser(currentUser);
            } else {
                setUserName(undefined);
                setUser(null);
            }
        });
        return (): void => unsubscribe();
    }, []);

    function logOut(): void {
        navigate('/home');
        authStore.dispatch({
            type: AuthActionType.Logout, payload: ""
        });
    }

    function goHome(): void {
        navigate('/home');
    }

    function navigateToLoginForm(): void {
        navigate('/login-form');
    }

    return (
        <div className="header">
            {userName
                ? <>
                    <div className="header-headline">
                        Hello <span>{userName}</span>
                        <div className="header-headline-container">
                            <div onClick={goHome}>
                                <AiFillHome className="header-icon header-home-icon-2 header-button" />
                            </div>
                            <div className="header-button-line">
                                <button
                                    onClick={logOut}
                                    className="header-button">
                                    <RiLogoutBoxFill
                                        className="header-js-icon"/>
                                        Logout
                                </button>
                                {user?.isAdmin
                                    ? <>
                                        <NavLink
                                            className="header-button"
                                            to="/vacations">
                                            <LuLayoutList className="header-js-icon"/>
                                            Vacations
                                        </NavLink>
                                        <NavLink
                                            className="header-button"
                                            to="/admin-form/add-vacation">
                                            <MdNoteAdd className="header-js-icon"/>
                                            Add Vacation
                                        </NavLink>
                                        <NavLink
                                            className="header-button"
                                            to="/charts">
                                            <IoBarChartSharp className="header-js-icon"/>
                                            Charts
                                        </NavLink>
                                        <NavLink
                                            className="header-button"
                                            to="/admin-page">
                                            <FaFileCsv className="header-js-icon"/>
                                            CSV-Download
                                        </NavLink>
                                    </>
                                    : <NavLink
                                        className="header-button"
                                        to="/vacations">
                                        <LuLayoutList className="header-js-icon"/>
                                        Vacations
                                     </NavLink>
                                }
                            </div>
                        </div>
                    </div>
                </>
                : <div className="header-button-line-2">
                    <div
                        className="header-icon header-button"
                        onClick={goHome}>
                        <AiFillHome className="header-icon header-home-icon" />
                    </div>
                    <button
                        className="header-button header-button-adding"
                        onClick={navigateToLoginForm}>
                        <RiLoginBoxFill
                            className="header-logout-icon"/>
                            Login
                    </button>
                 </div>
            }
            <div className="header-site-name">
               TraveLentz
            </div>
            <img src="/plain-image-no-background.png" className="header-plain-image" />
            <img src="/balloon-image-no-background.png" className="header-balloon-image" />
        </div>
    );
}

export default Header;