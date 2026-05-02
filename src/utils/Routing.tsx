import {JSX} from "react";
import {Route, Routes} from "react-router-dom";
import RegistrationForm from "../component/RegistrationForm/RegistrationForm";
import LoginForm from "../component/LoginForm/LoginForm";
import PrivateRoute from "../component/PrivateRoute";
import VacationLIst from "../component/VacationList/VacationList";
import AdminForm from "../component/AdminForm/AdminForm";
import HomePage from "../component/HomePage/HomePage";
import Charts from "../component/Cahrts/Charts";
import AdminPage from "../component/AdminPage/AdminPage";



function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/registration-form" element={<RegistrationForm />}/>
            <Route path="/login-form" element={<LoginForm />}/>
            <Route path="/home" element={<HomePage />}/>
            <Route path="/admin-form/update/:id" element={<PrivateRoute child={<AdminForm key="update"/>} adminOnly={true} />}/>
            <Route path="/admin-page" element={<PrivateRoute child={<AdminPage/>} adminOnly={true} />}/>
            <Route path="/charts" element={<PrivateRoute child={<Charts/>} adminOnly={true} />}/>
            <Route path="/admin-form/add-vacation" element={<PrivateRoute child={<AdminForm key="add" />} adminOnly={true} />}/>
            <Route path="/vacations" element={<PrivateRoute child={<VacationLIst/>}/>}/>
            <Route path="/" element={<HomePage />}/>
            <Route path="*"  element={<HomePage />}/>
        </Routes>
    );
}

export default Routing;
