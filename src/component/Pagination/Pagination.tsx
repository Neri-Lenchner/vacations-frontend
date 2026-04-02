import redux from 'redux';
import {JSX, useEffect, useState} from 'react';
import {vacationStore} from '../../state/vacation-state';
import './Pagination.css';

interface PaginationProps {
    totalVacations: number;
}

function Pagination(paginationProps: PaginationProps): JSX.Element {

    // const [totalVacations, setTotalVacations] = useState<number>(vacationStore.totalVacations);

    useEffect(() => {
        // vacationStore.subscribe(() => {
        //     setTotalVacations(vacationStore.totalVacations);
        // })
    }, []);
    return (
        <div className="pagination">
            Pagination
        </div>
    );
}

export default Pagination;