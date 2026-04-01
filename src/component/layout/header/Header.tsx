import React, {JSX, useEffect, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {Unsubscribe} from 'redux';
import {AuthActionType, authStore} from '../../../state/auth-state';
import './Header.css';

function Header(): JSX.Element {

    const navigate = useNavigate();

    const [userName, setUserName] = useState<string | undefined>(
        authStore.getState().token
            ? authStore.getState().user?.firstName
            : undefined
    );



    // authStore.getState().token && (
    //     authStore.getState().user?.firstName
    // )

    useEffect((): Unsubscribe => {
        const unsubscribe: Unsubscribe = authStore.subscribe((): void => {
            if (authStore.getState().user !== null) {
                console.log(authStore.getState().user?.firstName);
                setUserName(authStore.getState().user?.firstName)
            } else {
                setUserName(undefined);
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
                    <h2>
                        Hello {userName}
                    </h2>
                    <div className="header-button-line">
                        <button
                            onClick={logOut}
                            className="general-button"
                        >
                            Logout
                        </button>
                    </div>
                </>
                : <h2>Please login</h2>
            }

            {/*{userName*/}
            {/*    ? <h1>{"Hello " + userName}</h1>*/}
            {/*    : <h1>Please Login</h1>}*/}
        </div>
    );
}

export default Header;

// <input type="datetime-local"/>
// <input file="datetime-local"/>
