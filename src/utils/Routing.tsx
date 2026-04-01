import {JSX} from "react";
import {Route, Routes} from "react-router-dom";
import Main from "../component/layout/main/Main";
import RegistrationForm from "../component/RegistrationForm/RegistrationForm";
import LoginForm from "../component/LoginForm/LoginForm";
import PrivateRoute from "../component/PrivateRoute/PrivateRoute";
import VacationLIst from "../component/VacationList/VacationList";
import {authStore} from "../state/auth-state";



function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/registration-form" element={<RegistrationForm />}/>
            <Route path="/login-form" element={<LoginForm />}/>
            <Route path="/vacations" element={<PrivateRoute child={<VacationLIst/>}/>}/>
            <Route path="/" element={<PrivateRoute child={<VacationLIst />}/>}/>
            <Route path="*" element={<PrivateRoute child={<VacationLIst/>}/>}/>
            {/*<Route path="/new-course/:id?" element="example:{<CourseForm />}"/>*/}
        </Routes>
    );
}

export default Routing;
