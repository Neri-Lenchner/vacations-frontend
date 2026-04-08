import React, {JSX, useEffect, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {Unsubscribe} from 'redux';
import {AuthActionType, authStore} from '../../../state/auth-state';
import './Header.css';
import {User} from '../../../models/user.model';


function Header(): JSX.Element {

    const navigate = useNavigate();

    const [userName, setUserName] = useState<string | undefined>(
        authStore.getState().token
            ? (`${authStore.getState().user?.firstName!} ${authStore.getState().user?.lastName}` )
            : undefined
    );

    const [user, setUser] = useState<User | null>(authStore.getState().user);

    useEffect((): Unsubscribe => {
        const unsubscribe: Unsubscribe = authStore.subscribe((): void => {
            const currentUser = authStore.getState().user;
            if (currentUser !== null) {
                console.log(currentUser?.firstName);
                setUserName(`${currentUser?.firstName!} ${currentUser?.lastName}`);
                setUser(currentUser);
            } else {
                setUserName(undefined);
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    function logOut(): void {
        authStore.dispatch({
            type: AuthActionType.Logout, payload: ""
        });
        navigate('/login');
    }

    return (
        <div className="header">
            {userName
                ? <>
                    <div className="header-headline">
                        Hello <span>{userName}</span>
                    </div>
                    <div className="header-button-line">
                        <button
                            onClick={logOut}
                            className="header-button"
                        >
                            Logout
                        </button>
                        {user?.isAdmin
                            ? <>
                                <NavLink
                                    className={user.isAdmin && ("header-button")}
                                    to="/admin-form">
                                    Add Vacation
                                </NavLink>
                                <NavLink
                                    className={user.isAdmin && ("header-button")}
                                    to="/vacations">
                                    Vacations
                                </NavLink>
                            </>
                           : <div></div>
                        }
                    </div>
                </>
                : <h2 className="header-headline">
                    Please login
                </h2>
            }
        </div>
    );
}

export default Header;

// <input type="datetime-local"/>
// <input file="datetime-local"/>
