import {JSX} from "react";
import {Route, Routes} from "react-router-dom";
import Main from "../component/layout/main/Main";
import CourseForm from "../component/course-form/CourseForm";
import CourseListRoute from "../component/course-list-route/CourseListRoute";


function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/courses-list" element={<CourseListRoute />}/>
            <Route path="/new-course/:id?" element={<CourseForm />}/>
            <Route path="/" element={<Main />}/>
            <Route path="*" element={<Main />}/>
        </Routes>
    );
}

export default Routing;
