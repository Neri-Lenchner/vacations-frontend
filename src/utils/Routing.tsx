import {JSX} from "react";
import {Route, Routes} from "react-router-dom";
import RegistrationForm from "../component/RegistrationForm/RegistrationForm";
import LoginForm from "../component/LoginForm/LoginForm";
import PrivateRoute from "../component/PrivateRoute";
import VacationLIst from "../component/VacationList/VacationList";
import AdminForm from "../component/AdminForm/AdminForm";
import PrivateRouteAdmin from "../component/PrivateRouteAdmin";
import HomePage from "../component/HomePage/HomePage";
import Charts from "../component/Cahrts/Charts";
import AdminPage from "../component/AdminPage/AdminPage";



function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/registration-form" element={<RegistrationForm />}/>
            <Route path="/login-form" element={<LoginForm />}/>
            <Route path="/home" element={<HomePage />}/>
            <Route path="/admin-form/update/:id" element={<PrivateRouteAdmin child={<AdminForm key="update"/>}/>}/>
            <Route path="/admin-page" element={<PrivateRouteAdmin child={<AdminPage/>}/>}/>
            <Route path="/charts" element={<PrivateRouteAdmin child={<Charts/>}/>}/>
            <Route path="/admin-form/add-vacation" element={<PrivateRouteAdmin child={<AdminForm key="add" />}/>}/>
            <Route path="/vacations" element={<PrivateRoute child={<VacationLIst/>}/>}/>
            <Route path="/" element={<HomePage />}/>
            <Route path="*"  element={<HomePage />}/>
        </Routes>
    );
}

export default Routing;
