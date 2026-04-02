import {JSX,useEffect, useState} from "react";
import redux from 'redux';
import {vacationStore} from '../../state/vacation-state';
import "./VacationList.css";
import VacationItem from "../VacationItem/VacationItem";
import Pagination from "../Pagination/Pagination";


function VacationList(): JSX.Element {

        const [totalVacations, setTotalVacations] = useState<number>(vacationStore.getState().totalVacations);

        useEffect(() => {
                vacationStore.subscribe(() => {
                        setTotalVacations(vacationStore.getState().totalVacations);
                });
        }, []);
    return (
        <>
                <div className="vacation-list-container">
                        <VacationItem />
                        <VacationItem />
                        <VacationItem />
                        <VacationItem />
                        <VacationItem />
                        <VacationItem />
                        <VacationItem />
                        <VacationItem />
                        <VacationItem />
                        <VacationItem />
                        <VacationItem />
                        <VacationItem />
                        <VacationItem />
                        <VacationItem />
                        <VacationItem />
                        <VacationItem />
                        <VacationItem />
                </div>
                <Pagination totalVacations={totalVacations} />
        </>





    );
}

export default VacationList;