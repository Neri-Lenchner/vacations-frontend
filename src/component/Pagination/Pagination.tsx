
import {JSX} from 'react';
import {vacationService} from '../../services/vacation-service';
import './Pagination.css';

interface PaginationProps {
    totalVacations: number;
    onPageChange?: (page: number) => void;
}

function Pagination(paginationProps: PaginationProps): JSX.Element {

    const pagesNumbers: number[] = [];
    const limit: number = 10;
    const pages: number = Math.ceil(paginationProps.totalVacations / limit) || 1;

    function changePage(page: number) {
        if (paginationProps.onPageChange) {
            paginationProps.onPageChange(page);
        } else {
            vacationService.fetchPage(page);
        }
    }

    for (let i: number = 1; i <= pages; i++) {
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