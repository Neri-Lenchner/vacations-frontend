import redux from 'redux';
import {JSX, useEffect, useState} from 'react';
import {vacationStore} from '../../state/vacation-state';
import './Pagination.css';

interface PaginationProps {
    totalVacations: number;
}

function Pagination(paginationProps: PaginationProps): JSX.Element {

    const pagesNumbers: number[] = [];
    const limit: number = 10;
    const pages = Math.ceil(paginationProps.totalVacations / limit) || 5;

    for (let i = 1; i <= pages; i++) {
        pagesNumbers.push(i);
    }

    useEffect(() => {
        // vacationStore.subscribe(() => {
        //     setTotalVacations(vacationStore.totalVacations);
        // })
    }, []);
    return (
        <div className="pagination">
            <ul className="pagination-ul">
                {pagesNumbers.map((pageNumber: number) => (
                    <li className="pagination-li" key={pageNumber}>
                        <a className="pagination-link" >
                            {pageNumber}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Pagination;