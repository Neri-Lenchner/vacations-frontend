import React, {JSX, ReactNode, useState, useEffect} from 'react';
import {Unsubscribe} from "redux";
import {authStore} from "../../state/auth-state";
import {Navigate} from "react-router-dom";
import {User} from "../../models/user.model";

interface PrivateRouteProps {
    child: ReactNode;
}

function PrivateRoute(privateRouteProps: PrivateRouteProps): JSX.Element {


    const [user, setUser] = useState<User | null>(
        authStore.getState().user
            ? authStore.getState().user
            : null
    );

    useEffect((): Unsubscribe => {
        const unsubscribe: Unsubscribe = authStore.subscribe((): void => {
            if (authStore.getState().user !== null) {
                console.log(authStore.getState().user);
                setUser(authStore.getState().user)
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, [])


    if (!user) {
        return (<Navigate to="/login-form" />);
    }

    // if (!privateRouteProps.permissionIdList.includes(authStore.getState().user!.roleId)) {
    //     return (<Navigate to="/" />);
    // }

    return (
        <div>{privateRouteProps.child}</div>
    );
}

export default PrivateRoute;
