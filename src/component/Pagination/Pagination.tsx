
import {JSX} from 'react';
import {vacationService} from '../../services/vacation-service';
import './Pagination.css';

interface PaginationProps {
    totalVacations: number;
    handlePaginationChange?: (page: number) => void;
}

function Pagination({totalVacations, handlePaginationChange}: PaginationProps): JSX.Element {

    const pagesNumbers: number[] = [];
    const limit: number = 10;
    const pages: number = Math.ceil(totalVacations / limit) || 1;

    async function changePage(pageNum: number): Promise<void> {
        if (handlePaginationChange) {
            handlePaginationChange(pageNum);
        } else {
            try {
                await vacationService.fetchPage(pageNum);
            } catch (error) {
                throw error;
            }
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
                            onClick={(): Promise<void> => changePage(pageNumber)}
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