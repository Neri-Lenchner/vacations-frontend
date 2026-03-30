import {JSX} from "react";
import {Route, Routes} from "react-router-dom";
import Main from "../component/layout/main/Main";
import RegistrationForm from "../component/RegistrationForm/RegistrationForm";
import LoginForm from "../component/LoginForm/LoginForm";


function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/registration-form" element={<RegistrationForm />}/>
            <Route path="/login-form" element={<LoginForm />}/>
            <Route path="/new-course/:id?" element="example:{<CourseForm />}"/>
            <Route path="/" element={<Main />} />
            <Route path="*" element={<Main />} />
        </Routes>
    );
}

export default Routing;
