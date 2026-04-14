import {JSX} from "react";
import {Route, Routes} from "react-router-dom";
import RegistrationForm from "../component/RegistrationForm/RegistrationForm";
import LoginForm from "../component/LoginForm/LoginForm";
import PrivateRoute from "../component/PrivateRoute";
import VacationLIst from "../component/VacationList/VacationList";
import AdminForm from "../component/AdminForm/AdminForm";
import PrivateRouteAdmin from "../component/PrivateRouteAdmin";
import ConformationRoute from "../component/ConformationRoute/ConformationRoute";



function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/registration-form" element={<RegistrationForm />}/>
            <Route path="/login-form" element={<LoginForm />}/>
            <Route path="/admin-form/update/:id" element={<PrivateRouteAdmin child={<AdminForm key="update"/>}/>}/>
            <Route path="/admin-form/add-vacation" element={<PrivateRouteAdmin child={<AdminForm key="add" />}/>}/>
            <Route path="/conformation-route" element={<PrivateRouteAdmin child={<ConformationRoute/>}/>}/>
            <Route path="/vacations" element={<PrivateRoute child={<VacationLIst/>}/>}/>
            <Route path="/" element={<PrivateRoute child={<VacationLIst />}/>}/>
            <Route path="*" element={<PrivateRoute child={<VacationLIst/>}/>}/>
            {/*<Route path="/new-course/:id?" element="example:{<CourseForm />}"/>*/}
        </Routes>
    );
}

export default Routing;
