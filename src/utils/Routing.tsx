import {JSX} from "react";
import {Route, Routes} from "react-router-dom";
import Main from "../component/layout/main/Main";



function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/courses-list" element="example:{<CourseListRoute />}"/>
            <Route path="/new-course/:id?" element="example:{<CourseForm />}"/>
            <Route path="/" element={<Main />} />
            <Route path="*" element={<Main />} />
        </Routes>
    );
}

export default Routing;
