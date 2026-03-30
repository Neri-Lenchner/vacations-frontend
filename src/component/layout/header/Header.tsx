import React, {JSX, useEffect, useState} from 'react';
import {Unsubscribe} from 'redux';
import {AuthActionType, authStore} from '../../../state/auth-state';
import './Header.css';

function Header(): JSX.Element {

    const [userName, setUserName] = useState<string | undefined>(
        authStore.getState().token
            ? authStore.getState().user?.firstName
            : undefined
    );

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
        })
    }
    return (
        <div className="header">
            <div className="header-button-line">
                <button onClick={logOut}>
                    Logout
                </button>
            </div>
            {userName
                ? <h1>{"Hello " + userName}</h1>
                : <h1>Please Login</h1>}
        </div>
    );
}

export default Header;
