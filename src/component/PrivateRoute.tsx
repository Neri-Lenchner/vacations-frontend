import React, {JSX, ReactNode, useState, useEffect} from 'react';
import {Unsubscribe} from "redux";
import {authStore} from "../state/auth-state";
import {Navigate} from "react-router-dom";
import {User} from "../models/user.model";

interface PrivateRouteProps {
    child: ReactNode;
    adminOnly?: boolean;
}

function PrivateRoute({ child, adminOnly }: PrivateRouteProps): JSX.Element {

    const [user, setUser] = useState<User | null>(
        authStore.getState().user
            ? authStore.getState().user
            : null
    );

    useEffect((): Unsubscribe => {
        const unsubscribe: Unsubscribe = authStore.subscribe((): void => {
            if (authStore.getState().user !== null) {
                setUser(authStore.getState().user)
            } else {
                setUser(null);
            }
        });
        return (): void => unsubscribe();
    }, [])

    if (!user) return <Navigate to="/home" />;
    if (adminOnly && !user.isAdmin) return <Navigate to="/vacations" />;

    return <>{child}</>;
}

export default PrivateRoute;
