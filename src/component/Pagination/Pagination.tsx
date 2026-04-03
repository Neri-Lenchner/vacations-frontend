import redux from 'redux';
import {JSX, useEffect, useState} from 'react';
import {vacationStore} from '../../state/vacation-state';
import {vacationService} from '../../services/vacation-service';
import './Pagination.css';

interface PaginationProps {
    totalVacations: number;
}

function Pagination(paginationProps: PaginationProps): JSX.Element {

    const pagesNumbers: number[] = [];
    const limit: number = 10;
    const pages = Math.ceil(paginationProps.totalVacations / limit) || 5;

    function changePage(page: number) {
        vacationService.fetchPage(page);
    }

    for (let i = 1; i <= pages; i++) {
        pagesNumbers.push(i);
    }

    return (
        <div className="pagination">
            <ul className="pagination-ul">
                {pagesNumbers.map((pageNumber: number) => (
                    <li className="pagination-li" key={pageNumber}>
                        <button
                            className="pagination-page-number-button"
                            onClick={() => changePage(pageNumber)}
                        >
                            {pageNumber}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Pagination;