import React, {JSX, ReactNode, useState, useEffect} from 'react';
import {Unsubscribe} from "redux";
import {authStore} from "../../state/auth-state";
import {Navigate} from "react-router-dom";
import {User} from "../../models/user.model";

interface AdminRouteProps {
    child: ReactNode;
}

function AdminRoute(adminRouteProps: AdminRouteProps): JSX.Element {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        setUser(authStore.getState().user);
        const unsubscribe: Unsubscribe = authStore.subscribe((): void => {
            setUser(authStore.getState().user);
        });
        return () => unsubscribe();
    }, []);

    if (!user) {
        return (<Navigate to="/login-form" />);
    }

    if (!user.isAdmin) {
        return (<Navigate to="/" />);
    }

    return (
        <div>{adminRouteProps.child}</div>
    );
}

export default AdminRoute;
