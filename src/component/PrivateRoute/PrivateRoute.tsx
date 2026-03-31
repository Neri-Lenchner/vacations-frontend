import React, {JSX, ReactNode} from 'react';
import {authStore} from "../../state/auth-state";
import {Navigate} from "react-router-dom";


interface PrivateRouteProps {
    child: ReactNode;
    isAdmin: boolean;
}

function PrivateRoute(privateRouteProps: PrivateRouteProps): JSX.Element {

    if (!authStore.getState().user) {
        return (<Navigate to="/login" />);
    }

    if (!authStore.getState().user?.isAdmin) {
        return (<Navigate to="/vacations" />);
    }

    // if (!privateRouteProps.permissionIdList.includes(authStore.getState().user!.roleId)) {
    //     return (<Navigate to="/" />);
    // }

    return (
        <div>{privateRouteProps.child}</div>
    );
}

export default PrivateRoute;
