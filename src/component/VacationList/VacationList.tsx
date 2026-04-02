import {JSX,useEffect, useState} from "react";
import redux from 'redux';
import {Vacation} from '../../models/vacation.model';
import {vacationStore} from '../../state/vacation-state';
import {vacationService} from '../../services/vacation-service';
import "./VacationList.css";
import VacationItem from "../VacationItem/VacationItem";
import Pagination from "../Pagination/Pagination";


function VacationList(): JSX.Element {

        const [totalVacations, setTotalVacations] = useState<number>(vacationStore.getState().totalVacations);
        const [page, setPage] = useState<Vacation[]>(vacationStore.getState().vacationList);

        useEffect(() => {
                vacationService.fetchData(1);
                vacationStore.subscribe(() => {
                        setTotalVacations(vacationStore.getState().totalVacations);
                        setPage(vacationStore.getState().vacationList);
                });
        }, []);

    return (
        <>
            <div className="vacation-list-container">
                {page.map(vacation => (
                    <VacationItem
                        vacation={vacation}
                    />
                ))}
            </div>
            <Pagination totalVacations={totalVacations} />
        </>
    );
}

export default VacationList;